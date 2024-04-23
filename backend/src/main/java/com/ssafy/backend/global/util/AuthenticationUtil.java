package com.ssafy.backend.global.util;

import com.ssafy.backend.domain.user.dto.LoginUserDto;
import org.springframework.security.core.Authentication;

public class AuthenticationUtil {
	public static Long getCurrentUserId(Authentication authentication) {
		LoginUserDto user = (LoginUserDto) (authentication.getPrincipal());
		return user.userId();
	}
}
