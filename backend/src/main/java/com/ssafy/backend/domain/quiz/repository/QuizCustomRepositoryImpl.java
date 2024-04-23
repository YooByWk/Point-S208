package com.ssafy.backend.domain.quiz.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.education.entity.QActionLearning;
import com.ssafy.backend.domain.quiz.dto.response.QuizResponseDto;
import com.ssafy.backend.domain.quiz.entity.QWordQuiz;
import com.ssafy.backend.domain.quiz.entity.WordQuiz;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class QuizCustomRepositoryImpl implements QuizCustomRepository {

	QWordQuiz qWordQuiz = QWordQuiz.wordQuiz;
	QActionLearning qActionLearning = QActionLearning.actionLearning;
	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<WordQuiz> getWordQuiz(WordQuiz.Theme theme, Long userId) {
		return jpaQueryFactory.select(
						qWordQuiz
				).from(qWordQuiz)
				.join(qActionLearning)
				.on(qActionLearning.education.educationId.eq(qWordQuiz.education.educationId))
				.where(qActionLearning.user.userId.eq(userId))
				.fetch();
	}
}
