package com.ssafy.businesscard.security.handler;

import com.ssafy.businesscard.security.model.dto.response.IssuedToken;
import com.ssafy.businesscard.security.service.TokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Component
@Slf4j
public class OAuthSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenService tokenService; // JWT 토큰을 생성하는 서비스


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        if (authentication instanceof OAuth2AuthenticationToken) {
            OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

            // OAuth2 제공자로부터 받은 사용자 정보
            String username = oauthToken.getPrincipal().getAttribute("name");

//            if(oauthToken.){
//
//            }

            // 사용자 정보를 바탕으로 JWT 생성
            IssuedToken jwtToken = tokenService.issueToken(authentication);
            log.info("jwttoken"+jwtToken.getAccessToken());
            // JWT를 HTTP 응답에 추가
            response.addHeader("Authorization", "Bearer " + jwtToken.getAccessToken());

        } else {
            throw new IllegalArgumentException("AuthenticationSuccessHandler only supports OAuth2AuthenticationToken");
        }

    }

}
