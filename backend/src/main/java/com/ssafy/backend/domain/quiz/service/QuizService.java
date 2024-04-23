package com.ssafy.backend.domain.quiz.service;

import com.ssafy.backend.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.backend.domain.quiz.entity.WordQuiz;

import java.util.List;

public interface QuizService {

	List<QuizResponseDto> getQuiz(WordQuiz.Theme theme, Long bookId, Long userId);
}
