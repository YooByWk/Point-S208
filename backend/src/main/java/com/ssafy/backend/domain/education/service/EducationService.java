package com.ssafy.backend.domain.education.service;

import com.ssafy.backend.domain.education.dto.response.EducationResponseDto;

public interface EducationService {
	EducationResponseDto getEducation(Long userId, Long educationId);
}
