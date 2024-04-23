package com.ssafy.backend.domain.quiz.mapper;

import com.ssafy.backend.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.backend.domain.quiz.entity.WordQuiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WordQuizMapper {
	@Mapping(source = "wordQuiz.quizAnswerList", target = "choices")
	QuizResponseDto toQuizResponseDto(WordQuiz wordQuiz);
}
