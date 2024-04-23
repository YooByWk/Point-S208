package com.ssafy.backend.domain.quiz.dto.response;

import com.ssafy.backend.domain.quiz.dto.AnswerDto;
import lombok.Builder;

import java.util.List;

@Builder
public record QuizResponseDto(
		String content,
		List<AnswerDto> choices
) {
}
