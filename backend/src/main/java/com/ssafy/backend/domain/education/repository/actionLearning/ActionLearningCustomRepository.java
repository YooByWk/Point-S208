package com.ssafy.backend.domain.education.repository.actionLearning;

import java.util.List;

public interface ActionLearningCustomRepository {
	List<String> getActionImageListByUserAndEducation(Long userId, Long educationId);
}
