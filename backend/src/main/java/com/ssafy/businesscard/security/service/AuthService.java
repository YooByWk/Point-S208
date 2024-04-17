package com.ssafy.businesscard.security.service;

import com.ssafy.businesscard.security.model.dto.request.LoginRequest;
import com.ssafy.businesscard.security.model.dto.response.IssuedToken;
import com.ssafy.businesscard.security.model.entity.CustomAuthenticationToken;
import com.ssafy.businesscard.user.exception.UserErrorCode;
import com.ssafy.businesscard.user.exception.UserException;
import com.ssafy.businesscard.user.model.entity.Member;
import com.ssafy.businesscard.user.model.entity.MemberProfile;
import com.ssafy.businesscard.user.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RequiredArgsConstructor
@Slf4j
@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final TokenService tokenService;

//    public IssuedToken login(LoginRequest loginRequest) {
//        // 사용자가 입력한 정보
//        String inputEmail = loginRequest.getEmail();
//        String inputPassword = loginRequest.getPassword();
//
//        try {
//            Authentication authentication =
//                    authenticationManager.authenticate(new CustomAuthenticationToken(inputEmail, inputPassword));
//            // 성공한 인증객체를 ContextHolder에 등록
////            SecurityContextHolder.getContext().setAuthentication(authentication);
//            log.info("로그인 성공 객체정보 : {} ", authentication.toString());
//
//            // 해당 인증 객체를 바탕으로 토큰을 발급한다
//            IssuedToken issuedToken = tokenService.issueToken(authentication);
//            return issuedToken;
//
//        } catch (AuthenticationException e) {
//            throw new UserException(UserErrorCode.ACCESS_DENIED);
//        }
//    }

    public void logout() {
        // 인증 정보삭제
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = (String) principal;
        Member customUser = memberRepository.findByEmail(email).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        SecurityContextHolder.clearContext();
        log.info("사용자 로그아웃 : {}", email);

        // 유효한 access 토큰 블랙리스트에 저장
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpServletRequest request = attr.getRequest();

        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            String accessToken = token.split(" ")[1];
            tokenService.removeAccessToken(accessToken);
            log.info("로그아웃으로 인한 access토큰 블랙리스트 추가 : {}", accessToken);
        }

    }

    // SecurityContext에 저장된 auth 객체 조조히
    public Authentication getAuthenticationInContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("현재 쓰레드 Context에 저장된 Authentication : {} ", authentication.toString());
        log.info("현재 쓰레드 Context에 저장된 principal : {} ", authentication.getName());
        return authentication;
    }

    public IssuedToken refresh(String refreshToken) {
        return tokenService.reIssueAccessTokenByRefreshToken(refreshToken);
    }

}
