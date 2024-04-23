package com.ssafy.backend.domain.education.repository.actionLearning;

import com.ssafy.backend.domain.education.entity.ActionLearning;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionLearningRepository extends JpaRepository<ActionLearning, Long>, ActionLearningCustomRepository {
}
