package com.ssafy.businesscard.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Map;

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
            log.info("successhandler"+request);
            // OAuth2 제공자로부터 받은 사용자 정보
//            String username = oauthToken.getPrincipal().getAttribute("name");

//            if(oauthToken.){
//
//            }

            // 사용자 정보를 바탕으로 JWT 생성
//            IssuedToken jwtToken = tokenService.issueToken(authentication);
//            log.info("jwttoken"+jwtToken.getAccessToken());
            // JWT를 HTTP 응답에 추가
//            response.addHeader("Authorization", "Bearer " + jwtToken.getAccessToken());


            // 사용자 정보 추출 (예제에서는 단순화를 위해 Map 형태로 가정)
            Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();

            // 사용자 정보를 JSON 형태로 변환
            ObjectMapper objectMapper = new ObjectMapper();
            String userInfoJson = objectMapper.writeValueAsString(attributes);

            // 응답 설정
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(userInfoJson);

            // 로그 기록
            log.info("Sending user info as JSON: " + userInfoJson);
        } else {
            throw new IllegalArgumentException("AuthenticationSuccessHandler only supports OAuth2AuthenticationToken");
        }

    }

}
