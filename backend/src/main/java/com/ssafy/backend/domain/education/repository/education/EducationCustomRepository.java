package com.ssafy.backend.domain.education.repository.education;

import com.ssafy.backend.domain.education.dto.BookEducationDto;
import com.ssafy.backend.domain.education.dto.UserEducationDto;
import com.ssafy.backend.domain.education.dto.response.EducationResponseDto;

import java.util.List;

public interface EducationCustomRepository {
	List<UserEducationDto> findEducationByUser(Long userId);
	EducationResponseDto getEducationDetails(Long educationId);
	List<BookEducationDto> findAllByBookPageSentence_BookPageSentenceIdIn(List<Long> bookPageSentenceId);
}
