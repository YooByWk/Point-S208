package com.ssafy.backend.domain.quiz.entity;

import com.ssafy.backend.domain.book.entity.Book;
import com.ssafy.backend.domain.education.entity.Education;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
public class WordQuiz {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long quiz_id;

	@ManyToOne
	@JoinColumn(name = "education_id")
	@Nullable
	private Education education;

	@ManyToOne
	@JoinColumn(name = "book_id")
	@Nullable
	private Book book;

	@Enumerated(EnumType.STRING)
	private Theme theme;
	private String content;

	@OneToMany(mappedBy = "wordQuiz")
	private List<QuizAnswer> quizAnswerList = new ArrayList<>();


	public enum Theme {
		WORD,
		STORY
	}
}
