package com.ssafy.backend.domain.donggle.dto.response;

import lombok.Builder;

@Builder
public record DonggleResponseDto(
		String content,
		String dgSoundPath
) {
}
