package com.ssafy.backend.domain.user.dto.response;

import com.ssafy.backend.domain.user.entity.User;
import lombok.Builder;

@Builder
public record UserResponseDto(
		String email,
		String nickname,
		String role,
		String profileImage,
		boolean isOauth
) {
	public static UserResponseDto from(User user) {
		return UserResponseDto.builder()
				.email(user.getEmail())
				.nickname(user.getNickname())
				.role(user.getRole().name())
				.profileImage(user.getProfileImage())
				.isOauth(user.getProvider()!=null)
				.build();
	}
}
