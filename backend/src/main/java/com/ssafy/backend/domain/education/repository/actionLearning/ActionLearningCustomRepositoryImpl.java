package com.ssafy.backend.domain.education.repository.actionLearning;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.education.entity.QActionLearning;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class ActionLearningCustomRepositoryImpl implements ActionLearningCustomRepository {
	private final JPAQueryFactory jpaQueryFactory;

	QActionLearning qActionLearning = QActionLearning.actionLearning;

	@Override
	public List<String> getActionImageListByUserAndEducation(Long userId, Long educationId) {
		return jpaQueryFactory
				.select(
						qActionLearning.userPath
				).from(qActionLearning)
				.where(qActionLearning.user.userId.eq(userId))
				.where(qActionLearning.education.educationId.eq(educationId))
				.fetch();
	}
}
