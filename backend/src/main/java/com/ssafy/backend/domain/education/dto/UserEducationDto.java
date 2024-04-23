package com.ssafy.backend.domain.education.dto;

import lombok.Builder;

@Builder
public record UserEducationDto(
		Long educationId,
		String wordName,
		String imagePath,
		boolean isEducated
) {
}
