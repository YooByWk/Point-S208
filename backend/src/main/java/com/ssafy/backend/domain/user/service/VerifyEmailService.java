package com.ssafy.backend.domain.user.service;

import com.ssafy.backend.domain.user.entity.User;

public interface VerifyEmailService {
	void sendVerificationMail(String email);
}
