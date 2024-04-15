package com.ssafy.businesscard.security.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.businesscard.global.utils.MessageUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.ssafy.businesscard.security.exception.JwtErrorCode.*;

@Slf4j
@Configuration
public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) {
        try {
            filterChain.doFilter(request, response);
        } catch (MalformedJwtException e) {
            log.error("exception : 잘못된 엑세스 토큰 시그니처");
            setErrorResponse(response, TOKEN_SIGNATURE_ERROR.getHttpStatus(), TOKEN_SIGNATURE_ERROR.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("exception : 엑세스 토큰 기간 만료");
            setErrorResponse(response, EXPIRED_TOKEN.getHttpStatus(), EXPIRED_TOKEN.getMessage());
        } catch (UnsupportedJwtException | SignatureException e) {
            log.error("exception : 지원되지 않는 엑세스 토큰");
            setErrorResponse(response, NOT_SUPPORT_TOKEN.getHttpStatus(), NOT_SUPPORT_TOKEN.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("exception : 잘못된 엑세스 토큰");
            setErrorResponse(response, INVALID_TOKEN.getHttpStatus(), INVALID_TOKEN.getMessage());
        } catch (Exception e) {
            log.error("exception : {}", e);
            e.printStackTrace();
            setErrorResponse(response, HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    private void setErrorResponse(HttpServletResponse response, HttpStatus status, String errorMassage) {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);

        try{
            // 피드백 -> ObjectMapper 객체 캐스팅하면서 생성가능?
            String jsonResponse = (new ObjectMapper()).writeValueAsString(MessageUtils.fail(status.name(), errorMassage));
            response.getWriter().write(jsonResponse);

        }catch (IOException e){
            e.printStackTrace();
        }

//        ObjectMapper objectMapper = new ObjectMapper();
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
//        try {
//            String jsonResponse = objectMapper.writeValueAsString(MessageUtils.fail(status.name(), errorMassage));
//            response.getWriter().write(jsonResponse);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
    }


}
