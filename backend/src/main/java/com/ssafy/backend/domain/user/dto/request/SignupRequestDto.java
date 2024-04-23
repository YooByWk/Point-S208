package com.ssafy.backend.domain.user.dto.request;

import lombok.Builder;

@Builder
public record SignupRequestDto(
		String email,
		String password,
		String nickname
) {

}
