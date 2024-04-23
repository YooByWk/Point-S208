package com.ssafy.backend.domain.education.service.impl;

import com.ssafy.backend.domain.education.dto.response.EducationResponseDto;
import com.ssafy.backend.domain.education.repository.actionLearning.ActionLearningRepository;
import com.ssafy.backend.domain.education.repository.education.EducationRepository;
import com.ssafy.backend.domain.education.service.EducationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EducationServiceImpl implements EducationService {

	private final EducationRepository educationRepository;
	private final ActionLearningRepository actionLearningRepository;

	@Override
	public EducationResponseDto getEducation(Long userId, Long educationId) {
		EducationResponseDto educationResponseDto = educationRepository.getEducationDetails(educationId);
		List<String> imageList = actionLearningRepository.getActionImageListByUserAndEducation(userId, educationId);
		return EducationResponseDto.from(educationResponseDto, imageList);
	}
}
