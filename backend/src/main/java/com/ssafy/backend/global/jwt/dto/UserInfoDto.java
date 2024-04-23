package com.ssafy.backend.global.jwt.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.domain.user.entity.User;
import lombok.*;

@Builder
public record UserInfoDto(

		@JsonProperty("user_id")
		Long userId,

		String email,
		String role,
		String nickname,

		@JsonProperty("profile_image")
		String profileImage
) {
	public static UserInfoDto from(User user) {
		return UserInfoDto.builder()
				.userId(user.getUserId())
				.email(user.getEmail())
				.nickname(user.getNickname())
				.profileImage(user.getProfileImage())
				.role(user.getRole().name())
				.build();
	}

}
