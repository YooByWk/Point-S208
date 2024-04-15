package com.ssafy.businesscard.security.config;

import com.ssafy.businesscard.security.exception.AuthErrorCode;
import com.ssafy.businesscard.security.exception.AuthException;
import com.ssafy.businesscard.security.model.entity.CustomAuthenticationToken;
import com.ssafy.businesscard.security.service.DataBaseUserDetailsService;
import com.ssafy.businesscard.user.model.entity.Member;
import com.ssafy.businesscard.user.model.entity.MemberProfile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class
CustomAuthenticationProvider implements AuthenticationProvider {

    private final PasswordEncoder passwordEncoder;
    private final DataBaseUserDetailsService dataBaseUserDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        log.info("인증 전 Authentication : {}", authentication);
        // 인증 로직 정의

        // 사용자가 입력한 정보를 바탕으로 DB에 저장된 정보와 비교한다
        String inputUsername = authentication.getName();
        String inputPassword = authentication.getCredentials().toString();

        Member customUser = null;
        try {
            customUser = dataBaseUserDetailsService.loadUserByUsername(inputUsername);
        } catch (UsernameNotFoundException e) {
            // 데이터 없으면
            throw new AuthException(AuthErrorCode.NOT_EXISTS);
        }

        // 유저가 입력한 패스워드와 DB에 있는 정보 비교 (자격 검정)
        if (passwordEncoder.matches(inputPassword, customUser.getPassword())) {
            // 자격 검정에 성공하면 사용자 정보,인증 성공 상태를 담은 인증 객체를 리턴한다
            // principal 은 email
            return new CustomAuthenticationToken(
//                    customUser,
                    customUser.getEmail(),
                    customUser.getId(),
                    null,
                    customUser.getAuthorities()
            );
//            return new UsernamePasswordAuthenticationToken(customUser.getUsername(), null, customUser.getAuthorities()); // 비밀번호는 이제 전달x
        } else {
            throw new BadCredentialsException(inputUsername + "의 비밀번호가 아님");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        // 인증 객체 종류 지정
        // providerManager 가 이 provider를 사용할지 결정하는
        return CustomAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
