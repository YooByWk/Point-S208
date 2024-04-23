package com.ssafy.backend.domain.user.dto.request;

public record PasswordRequestDto(
		String currentPassword,
		String newPassword
) {
}
