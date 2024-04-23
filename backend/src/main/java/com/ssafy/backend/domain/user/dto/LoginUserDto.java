package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import lombok.Builder;

@Builder
public record LoginUserDto(

		@JsonProperty("user_id")
		Long userId,

		String email,
		String role,
		String nickname,

		@JsonProperty("profile_image")
		String profileImage
) {
	public static LoginUserDto from(UserInfoDto info) {
		return LoginUserDto.builder()
				.userId(info.userId())
				.email(info.email())
				.nickname(info.nickname())
				.profileImage(info.profileImage())
				.role(info.role())
				.build();
	}
}
