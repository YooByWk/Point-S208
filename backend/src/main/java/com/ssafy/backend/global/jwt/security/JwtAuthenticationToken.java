package com.ssafy.backend.global.jwt.security;

import com.ssafy.backend.domain.user.dto.LoginUserDto;
import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class JwtAuthenticationToken extends AbstractAuthenticationToken {

	private LoginUserDto principal;
	private Object credentials;

	public JwtAuthenticationToken(LoginUserDto principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
		super(authorities);
		this.principal = principal;
		this.credentials = credentials;
		super.setAuthenticated(true);
	}

}
