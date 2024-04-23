package com.ssafy.backend.domain.user.dto.request;

import lombok.Getter;
import lombok.ToString;

public record LoginRequestDto(
		String email,
		String password
) {
}
