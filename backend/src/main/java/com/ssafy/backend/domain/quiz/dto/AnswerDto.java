package com.ssafy.backend.domain.quiz.dto;

public record AnswerDto(
		String choice,
		boolean answer,
		String choiceImagePath
) {
}
