package com.ssafy.backend.domain.quiz.repository;


import com.ssafy.backend.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.backend.domain.quiz.entity.WordQuiz;

import java.util.List;

public interface QuizCustomRepository {
	List<WordQuiz> getWordQuiz(WordQuiz.Theme theme, Long userId);
}
