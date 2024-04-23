package com.ssafy.backend.domain.quiz.service.impl;

import com.ssafy.backend.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.backend.domain.quiz.entity.WordQuiz;
import com.ssafy.backend.domain.quiz.mapper.WordQuizMapper;
import com.ssafy.backend.domain.quiz.repository.WordQuizRepository;
import com.ssafy.backend.domain.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

	private final WordQuizRepository wordQuizRepository;
	private final WordQuizMapper wordQuizMapper;

	@Override
	public List<QuizResponseDto> getQuiz(WordQuiz.Theme theme, Long bookId, Long userId) {
		List<WordQuiz> wordQuizzes = null;

		if (isWordTheme(theme)) {
			wordQuizzes = wordQuizRepository.getWordQuiz(theme, userId);
		} else {
			wordQuizzes = wordQuizRepository.findAllByThemeAndBook_bookId(theme, bookId);
		}

		wordQuizzes = quizShuffle(wordQuizzes);

		return wordQuizListToDtoList(wordQuizzes);
	}

	private static boolean isWordTheme(WordQuiz.Theme theme) {
		return theme.equals(WordQuiz.Theme.WORD);
	}

	private List<QuizResponseDto> wordQuizListToDtoList(List<WordQuiz> wordQuizzes) {
		return wordQuizzes.stream()
				.map(wordQuizMapper::toQuizResponseDto)
				.toList();
	}

	private static List<WordQuiz> quizShuffle(List<WordQuiz> wordQuizzes) {
		Collections.shuffle(wordQuizzes);
		wordQuizzes = wordQuizzes.stream()
				.map(quiz -> {
					Collections.shuffle(quiz.getQuizAnswerList());
					return quiz;
				})
				.toList();
		return wordQuizzes;
	}
}
