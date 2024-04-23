package com.ssafy.backend.domain.education.dto;

import com.ssafy.backend.domain.education.entity.Education;

public record EducationDto(
		Long educationId,
		Education.Gubun gubun,
		Education.Category category,
		String wordName,
		String imagePath,
		String traceImagePath,
		Long bookPageSentenceId
) {
}
