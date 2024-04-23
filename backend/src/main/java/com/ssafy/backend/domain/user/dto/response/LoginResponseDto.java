package com.ssafy.backend.domain.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import lombok.*;

@Builder
public record LoginResponseDto(

		@JsonProperty("user_info")
		UserResponseDto userInfo,

		TokenDto token
) {
}