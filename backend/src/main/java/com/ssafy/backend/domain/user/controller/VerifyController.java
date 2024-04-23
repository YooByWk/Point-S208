package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.response.UserResponseDto;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.domain.user.service.VerifyEmailService;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/verify")
@RequiredArgsConstructor
public class VerifyController {
	private final UserService userService;
	private final VerifyEmailService verifyEmailService;

	// 비밀번호 재설정 이메일 전송
	@GetMapping
	public ResponseEntity<String> verify(@RequestParam String email) {
		UserResponseDto user = userService.getUserInfo(email);
		verifyEmailService.sendVerificationMail(user.email());
		return ResponseEntity.ok("비밀번호 변경메일 전송이 완료되었습니다.");
	}


}

