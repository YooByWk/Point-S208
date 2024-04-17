package com.ssafy.businesscard.security.service;

import com.ssafy.businesscard.security.exception.AuthErrorCode;
import com.ssafy.businesscard.security.exception.AuthException;
import com.ssafy.businesscard.security.exception.JwtErrorCode;
import com.ssafy.businesscard.security.exception.JwtException;
import com.ssafy.businesscard.security.model.dto.response.IssuedToken;
import com.ssafy.businesscard.security.model.entity.CustomAuthenticationToken;
import com.ssafy.businesscard.security.model.entity.InvalidToken;
import com.ssafy.businesscard.security.model.entity.Token;
import com.ssafy.businesscard.security.repository.InvalidTokenRepository;
import com.ssafy.businesscard.security.repository.TokenRepository;
import com.ssafy.businesscard.security.util.JwtUtils;
import com.ssafy.businesscard.user.model.entity.Member;
import com.ssafy.businesscard.user.model.entity.MemberProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtUtils jwtUtils;
    private final TokenRepository tokenRepository;
    private final InvalidTokenRepository invalidTokenRepository;
    private final DataBaseUserDetailsService dataBaseUserDetailsService;

    public IssuedToken issueToken(Authentication authentication) {

        String accessToken;
        String refreshToken;
        Long userId = null;
        String email = null;

        // 인증 방식에 따라 이메일 추출
        if (authentication instanceof CustomAuthenticationToken) {
            CustomAuthenticationToken customAuth = (CustomAuthenticationToken) authentication;
            email = customAuth.getPrincipal().toString();
        }

        else if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
            email = oAuth2User.getAttribute("email");
            log.info("emailll"+email);
        }

        // 이메일 사용해서 사용자 정보 조회
        if (email != null) {
            try {
                Member customUser = dataBaseUserDetailsService.loadUserByUsername(email);
                userId = customUser.getId();
            } catch (UsernameNotFoundException e) {
                throw new AuthException(AuthErrorCode.NOT_EXISTS);
            }
        }

        // 사용자권한 추출
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        accessToken = jwtUtils.issueAccessToken(email, userId, authorities);
        refreshToken = jwtUtils.issueRefreshToken(email, userId, authorities);

        // Redis에 토큰 저장
        tokenRepository.save(new Token(userId, refreshToken));
        return new IssuedToken(accessToken, refreshToken);

    }

    public void removeAccessToken(String accessToken){
        // 로그아웃시 유효한 access 토큰을
        // redis에 blacklist로 보내야함
        jwtUtils.validateAccessToken(accessToken);
        invalidTokenRepository.save(new InvalidToken(accessToken));
    }


    // 유효기간 지난 access 토큰 refresh 토큰과 비교해서 재발행
    public IssuedToken reIssueAccessTokenByRefreshToken(String refreshToken) {
        // 미구현
        // EXPIRED_TOKEN

        if (jwtUtils.validateRefreshToken(refreshToken)) {
            Long userId = jwtUtils.getUserIdByRefreshToken(refreshToken);
            String userEmail = jwtUtils.getEmailByRefreshToken(refreshToken);
            List<String> userRole = jwtUtils.getRoleByRefreshToken(refreshToken);

            // 리프레쉬 토큰에 있는 userId로 DB에 저장된 토큰 refresh token 있는지 조회
            Token tokenInDB = tokenRepository.findById(userId).orElseThrow(() -> new JwtException(JwtErrorCode.NOT_EXISTS_TOKEN));
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // 지금 리프레쉬 토큰하고 DB에 저장된 리프레쉬토큰하고 같다면
            // 새로운 어세스 토큰과 리프레쉬 토큰 재발급
            if (refreshToken.equals(tokenInDB.getRefreshToken())) {
                // 기존 DB의 리프레쉬 토큰 삭제하고
//                IssuedToken newAccessToken = issueToken(userId, userEmail, userRole);
//                log.info("Token reissue : {}", reissuedToken.toString());
//                return reissuedToken;
            } else {
                // 두 리프레쉬 토큰이 다르다면
                // 해당 토큰은 유요하지 않다고 판단하고 따로 저장
                // 이후 예외처리
//                invalidTokenRepository.save(new InvalidToken(tokenInDB.getAccessToken(), tokenInDB.getRefreshToken()));
                throw new JwtException(JwtErrorCode.INVALID_TOKEN);
            }
        }
        throw new JwtException(JwtErrorCode.INVALID_TOKEN);
    }

}
