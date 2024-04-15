package com.ssafy.businesscard.security.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;


@Getter
public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {
    // userId 추가
    private Long userId;

    public CustomAuthenticationToken(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public CustomAuthenticationToken(Object principal, Long userId ,Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(principal, credentials, authorities);
        this.userId = userId;
    }


    @Override
    public String toString() {
        return super.toString() + "; userId=" + this.userId;
    }
}
