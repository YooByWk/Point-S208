package com.ssafy.backend.global.jwt.service;

import com.ssafy.backend.domain.user.dto.LoginUserDto;
import com.ssafy.backend.global.error.exception.TokenException;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.repository.TokenRepository;
import io.jsonwebtoken.*;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

import static com.ssafy.backend.global.error.exception.ExceptionType.EXPIRED_TOKEN;
import static com.ssafy.backend.global.error.exception.ExceptionType.INVALID_TOKEN;
import static javax.management.timer.Timer.ONE_MINUTE;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

	private final JwtUtils jwtUtils;
	private final TokenRepository tokenRepository;

	private static final String CLAIM_EMAIL = "email";
	private static final String CLAIM_NICKNAME = "nickname";
	private static final String CLAIM_PROFILE_IMAGE = "profileImage";
	private static final String CLAIM_ROLE = "role";

	@Override
	public String issueAccessToken(@NonNull UserInfoDto info) {
		Claims claims = Jwts.claims()
				.setId(String.valueOf(info.userId()));

		claims.put(CLAIM_EMAIL, info.email());
		claims.put(CLAIM_ROLE, info.role());
		claims.put(CLAIM_NICKNAME, info.nickname());
		claims.put(CLAIM_PROFILE_IMAGE, info.profileImage());
		return issueToken(claims, jwtUtils.getAccessTokenExpiredMin(), jwtUtils.getEncodedKey());
	}

	public String issueRefreshToken(@NonNull Long id) {
		Claims claims = Jwts.claims()
				.setId(String.valueOf(id));
		return issueToken(claims, jwtUtils.getRefreshTokenExpiredMin(), jwtUtils.getEncodedKey());
	}

	@Override
	public TokenDto issueToken(@NonNull UserInfoDto info) {
		String accessToken = issueAccessToken(info);
		String refreshToken = issueRefreshToken(Long.valueOf(info.userId()));
		tokenRepository.save(refreshToken, accessToken, jwtUtils.getRefreshTokenExpiredMin());
		return TokenDto.builder()
				.accessToken(accessToken)
				.accessTokenExpired(jwtUtils.getAccessTokenExpiredMin() * 60L)
				.refreshToken(refreshToken)
				.refreshTokenExpired(jwtUtils.getRefreshTokenExpiredMin() * 60L)
				.build();
	}

	private String issueToken(Claims claims, int expiresMin, Key secretKey) {
		Date now = new Date();
		return Jwts.builder()
				.setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + expiresMin * ONE_MINUTE))
				.signWith(secretKey, SignatureAlgorithm.HS512)
				.compact();
	}

	public LoginUserDto parseAccessToken(String accessToken) {
		Claims payload = parseToken(accessToken, jwtUtils.getEncodedKey());

		return LoginUserDto.builder()
				.userId(Long.valueOf(payload.getId()))
				.email(payload.get(CLAIM_EMAIL, String.class))
				.role(payload.get(CLAIM_ROLE, String.class))
				.nickname(payload.get(CLAIM_NICKNAME, String.class))
				.profileImage(payload.get(CLAIM_PROFILE_IMAGE, String.class))
				.build();
	}

	public Long parseRefreshToken(String refreshToken) {
		Claims claims = parseToken(refreshToken, jwtUtils.getEncodedKey());
		return Long.valueOf(claims.getId());
	}

	private Claims parseToken(String token, Key secretKey) {
		try {
			return Jwts.parserBuilder()
					.setSigningKey(secretKey)
					.build()
					.parseClaimsJws(token).getBody();
		} catch (SecurityException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
			throw new TokenException(INVALID_TOKEN);
		} catch (ExpiredJwtException ex) {
			throw new TokenException(EXPIRED_TOKEN);
		}
	}

	private long calculateExpiration(@NonNull String accessToken) {
		Claims claims = parseToken(accessToken, jwtUtils.getEncodedKey());

		long expiration = claims.getExpiration().getTime();
		long now = new Date().getTime();

		return expiration - now;
	}

	public void addBlackList(@NonNull String accessToken) {
		accessToken = accessToken.substring(7);
		LoginUserDto loginUserDto = parseAccessToken(accessToken);
		long expiration = calculateExpiration(accessToken);
		tokenRepository.save(accessToken, "BLACK_LIST", expiration);
		tokenRepository.delete(String.valueOf(loginUserDto.userId()));

	}

	public boolean isBlack(String jwt) {
		return tokenRepository.hasKey(jwt);
	}
}
