package com.ssafy.backend.global.jwt.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.user.dto.LoginUserDto;
import com.ssafy.backend.global.dto.ErrorResponse;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.TokenException;
import com.ssafy.backend.global.jwt.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

import static com.ssafy.backend.global.error.exception.ExceptionType.INVALID_TOKEN;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String BEARER_PREFIX = "Bearer ";

	private final JwtService jwtService;
	private final ObjectMapper objectMapper;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String jwt = getJwtToken(request);

		if (isLogout(jwt, response)) {
			return;
		}
		if (jwt != null && !authenticate(response, jwt)) {
			return;
		}
		filterChain.doFilter(request, response);
	}

	private static String getJwtToken(HttpServletRequest request) {
		String token = request.getHeader(AUTHORIZATION_HEADER);

		if (token != null) {
			token = token.replaceAll("\"", "");
		}
		if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
			return token.substring(7);
		}

		return null;
	}

	private boolean isLogout(String jwt, HttpServletResponse response) throws IOException {
		try {
			if (jwt != null && jwtService.isBlack(jwt)) {
				throw new TokenException(INVALID_TOKEN);
			}
		} catch (TokenException ex) {
			SecurityContextHolder.clearContext();
			sendError(response, ex);
			return true;
		}
		return false;
	}

	private boolean authenticate(HttpServletResponse response, String jwt) throws IOException {
		if (StringUtils.hasText(jwt)) {
			try {
				LoginUserDto loginUserDto = jwtService.parseAccessToken(jwt);
				saveLoginUserInSecurityContext(loginUserDto);
			} catch (TokenException ex) {
				SecurityContextHolder.clearContext();
				sendError(response, ex);
				return false;
			}
		}

		return true;
	}

	private void sendError(HttpServletResponse response, TokenException ex) throws IOException {
		response.setStatus(ex.getStatus());
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		response.setCharacterEncoding("UTF-8");

		PrintWriter writer = response.getWriter();
		ExceptionType exceptionType = ex.getExceptionType();
		writer.write(objectMapper.writeValueAsString(
				ErrorResponse.fail(exceptionType.getHttpStatus().name(), exceptionType.getErrorMessage())
		));

		writer.flush();
	}

	private static void saveLoginUserInSecurityContext(LoginUserDto loginUserDto) {
		JwtAuthenticationToken authenticationToken = new JwtAuthenticationToken(
				loginUserDto, "",
				Arrays.asList(new SimpleGrantedAuthority(loginUserDto.role()))
		);
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	}

}
