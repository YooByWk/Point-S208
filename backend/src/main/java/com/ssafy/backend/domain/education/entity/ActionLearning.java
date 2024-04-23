package com.ssafy.backend.domain.education.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
public class ActionLearning {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long actionId;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "education_id")
	private Education education;

	private String userPath;

	@Builder
	public ActionLearning(User user, Education education, String userPath) {
		this.user = user;
		this.education = education;
		this.userPath = userPath;
	}
}
