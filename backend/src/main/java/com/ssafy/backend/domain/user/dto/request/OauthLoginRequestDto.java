package com.ssafy.backend.domain.user.dto.request;

public record OauthLoginRequestDto(
		String publisher,
		String token
) {
}
