package com.ssafy.businesscard.security.util;

import com.ssafy.businesscard.security.config.JwtProperties;
import com.ssafy.businesscard.security.exception.JwtErrorCode;
import com.ssafy.businesscard.security.exception.JwtException;
import com.ssafy.businesscard.security.repository.InvalidTokenRepository;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtUtils {
    // JWT 관련 시크릿키, 토큰 유효시간 등 설정

    private final JwtProperties jwtProperties;
    private static final ZoneId zoneId = ZoneId.of("Asia/Seoul");
    private String accessSecretKey;
    private String refreshSecretKey;

    private final InvalidTokenRepository invalidTokenRepository;

    @PostConstruct
    protected void encodeKey() {
        accessSecretKey = Base64.getEncoder().encodeToString(jwtProperties.getAccess().getBytes());
        refreshSecretKey = Base64.getEncoder().encodeToString(jwtProperties.getRefresh().getBytes());
    }


    // 토큰 발행시간
    public Date getIssuedAt() {
        return Date.from(ZonedDateTime.now(zoneId).toInstant());
    }

    // 토큰만료시간
    public Date getExpiredTime(Long period) {
//        log.info("Token : lifetime = {}", period);
        return Date.from(ZonedDateTime.now(zoneId).plus(Duration.ofMillis(period)).toInstant());
    }

    // 엑세스 토큰 생성
    public String issueAccessToken(String email, Long userId ,Collection<? extends GrantedAuthority> authorities) {
        // email로 subject 설정

        List<String> authorityList = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

//        log.info("Token : Issue AccessToken for princiapl : {}, authorities : {}", email, authorityList);

        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId )
                .claim("authorities", authorityList)
                .setIssuedAt(getIssuedAt())
                .setExpiration(getExpiredTime(jwtProperties.getAccesstime()))
                .signWith(SignatureAlgorithm.HS256, accessSecretKey)
                .compact();
    }

    // 리프레시 토큰 생성
    public String issueRefreshToken(String email, Long userId ,Collection<? extends GrantedAuthority> authorities) {

        List<String> authorityList = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        log.info("Token : Issue RefreshToken for princiapl : {}, authorities : {}", email, authorityList);

        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId )
                .claim("authorities", authorityList)
                .setIssuedAt(getIssuedAt())
                .setExpiration(getExpiredTime(jwtProperties.getRefreshtime()))
                .signWith(SignatureAlgorithm.HS256, refreshSecretKey)
                .compact();
    }

    // Access 토큰 검증
    public Jws<Claims> validateAccessToken(final String token) {
        try {
            // 토큰의 서명을 검증하고 클레임 추출
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(accessSecretKey).parseClaimsJws(token);
            invalidTokenRepository.findById(token).ifPresent(value -> {
                throw new JwtException(JwtErrorCode.TOKEN_SIGNATURE_ERROR);
            });
            return claimsJws;
        } catch (MalformedJwtException e) {
            log.info("exception : 잘못된 엑세스 토큰 시그니처");
            throw new JwtException(JwtErrorCode.TOKEN_SIGNATURE_ERROR, e.getMessage());
        } catch (IllegalArgumentException e) {
            log.info("exception : 잘못된 엑세스 토큰");
            throw new JwtException(JwtErrorCode.INVALID_TOKEN, e.getMessage());
        } catch (ExpiredJwtException e) {
            log.info("exception : 엑세스 토큰 기간 만료");
            throw new JwtException(JwtErrorCode.EXPIRED_TOKEN, e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.info("exception : 지원되지 않는 엑세스 토큰");
            throw new JwtException(JwtErrorCode.NOT_SUPPORT_TOKEN, e.getMessage());
        }
    }


    // Refresh Token 검증
    public boolean validateRefreshToken(final String token) throws JwtException {
        try {
            Jwts.parserBuilder().setSigningKey(refreshSecretKey).build()
                    .parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException e) {
            log.info("exception : 잘못된 리프레쉬 토큰 시그니처");
            throw new JwtException(JwtErrorCode.TOKEN_SIGNATURE_ERROR, e.getMessage());
        } catch (ExpiredJwtException e) {
            log.info("exception : 리프레쉬 토큰 기간 만료");
            throw new JwtException(JwtErrorCode.EXPIRED_TOKEN, e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.info("exception : 지원되지 않는 리프레쉬 토큰");
            throw new JwtException(JwtErrorCode.NOT_SUPPORT_TOKEN, e.getMessage());
        } catch (IllegalArgumentException e) {
            log.info("exception : 잘못된 리프레쉬 토큰");
            throw new JwtException(JwtErrorCode.INVALID_TOKEN, e.getMessage());
        }
    }


    // claim -> user의 id, email, role
    // 재발급 할 때 기존 토큰에서 위 정보 가져올 수 있도록 메서드 만들어두기
    public Long getUserIdByAccessToken(String accessToken){
        return Long.valueOf(
                validateAccessToken(accessToken).getBody().get("userId", Long.class)
        );
    }

    public String getEmailByAccessToken(String accessToken) {
        return validateAccessToken(accessToken).getBody().getSubject();
    }

    public List<String> getRoleByAccessToken(String accessToken) {
        return validateAccessToken(accessToken).getBody().get("authorities", List.class);
    }


    public Long getUserIdByRefreshToken(String refreshToken) {
        return Long.valueOf(
                Jwts.parserBuilder()
                        .setSigningKey(refreshSecretKey)
                        .build()
                        .parseClaimsJws(refreshToken)
                        .getBody()
                        .get("userId", Long.class)
        );
    }

    public String getEmailByRefreshToken(String refreshToken) {
        return Jwts.parserBuilder()
                .setSigningKey(refreshSecretKey)
                .build()
                .parseClaimsJws(refreshToken)
                .getBody()
                .getSubject();
    }



    public List<String> getRoleByRefreshToken(String refreshToken) {
        return Jwts.parserBuilder()
                .setSigningKey(refreshSecretKey)
                .build()
                .parseClaimsJws(refreshToken)
                .getBody()
                .get("authorities", List.class);

    }


}

