package com.ssafy.backend.domain.education.dto.response;

import com.ssafy.backend.domain.education.entity.Education;
import lombok.Builder;

import java.util.ArrayList;
import java.util.List;

@Builder
public record EducationResponseDto(
		Education.Category category,
		String wordName,
		String imagePath,
		String bookTitle,
		String bookSentence,
		String traceImagePath,
		List<String> userImages
) {
	public EducationResponseDto(Education.Category category, String wordName, String imagePath, String bookTitle, String bookSentence, String traceImagePath) {
		this(category, wordName, imagePath, bookTitle, bookSentence, traceImagePath, new ArrayList<>());
	}

	public static EducationResponseDto from(EducationResponseDto educationResponseDto, List<String> userImageList) {
		return EducationResponseDto.builder()
				.category(educationResponseDto.category())
				.wordName(educationResponseDto.wordName())
				.imagePath(educationResponseDto.imagePath())
				.bookTitle(educationResponseDto.bookTitle())
				.bookSentence(educationResponseDto.bookSentence())
				.traceImagePath(educationResponseDto.traceImagePath())
				.userImages(userImageList)
				.build();
	}
}
