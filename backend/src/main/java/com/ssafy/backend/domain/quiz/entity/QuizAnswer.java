package com.ssafy.backend.domain.quiz.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

@Entity
@Getter
@ToString
public class QuizAnswer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long choiceId;

	private String choice;
	private boolean answer;
	private String choiceImagePath;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "quiz_id")
	private WordQuiz wordQuiz;
}
