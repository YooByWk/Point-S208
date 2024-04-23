package com.ssafy.backend.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ReissueDto(
		String refreshToken
) {
}
