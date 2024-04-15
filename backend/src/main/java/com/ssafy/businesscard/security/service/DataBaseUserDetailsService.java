package com.ssafy.businesscard.security.service;

import com.ssafy.businesscard.user.exception.UserErrorCode;
import com.ssafy.businesscard.user.exception.UserException;
import com.ssafy.businesscard.user.model.entity.Member;
import com.ssafy.businesscard.user.model.entity.MemberProfile;
import com.ssafy.businesscard.user.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;


@Service
@AllArgsConstructor
public class DataBaseUserDetailsService implements UserDetailsService {
    // DB에서 유저 정보 조회

    private final MemberRepository userRepository;

    @Override
    public Member loadUserByUsername(String username) throws UsernameNotFoundException {
        Member customUser = userRepository.findByEmail(username).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        return customUser;
//        return new User(customUser.getEmail(), customUser.getPassword(), getAuthorities(customUser));
    }

    private Collection<? extends GrantedAuthority> getAuthorities(MemberProfile customUser) {
        // 권한 설정.
        return Collections.singletonList(new SimpleGrantedAuthority(customUser.getRole()));
    }

}


