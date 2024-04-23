package com.ssafy.backend.domain.donggle.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Donggle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long messageId;

	@Enumerated(EnumType.STRING)
	private Situation situation;

	private String content;
	private String dgSoundPath;

	public enum Situation {
		BOOKLIST,
		BOOK,
		QUIZ,
		QUIZRESULT_WRONG,
		QUIZRESULT_CORRECT,
		WORDLIST,
		WORD
	}
}
