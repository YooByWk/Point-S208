package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.dto.ReissueDto;
import com.ssafy.backend.domain.user.dto.request.LoginRequestDto;
import com.ssafy.backend.domain.user.dto.request.SignupRequestDto;
import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final JwtService jwtService;

	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody SignupRequestDto signupRequestDto) {
		authService.signUp(signupRequestDto);
		return ResponseEntity.ok("회원가입이 완료되었습니다.");
	}

	@PostMapping("/login")
	public ResponseEntity<TokenDto> login(@RequestBody LoginRequestDto loginRequestDto) {
		UserInfoDto userInfoDto = authService.login(loginRequestDto.email(), loginRequestDto.password());
		TokenDto tokenDto = jwtService.issueToken(userInfoDto);

		return ResponseEntity.ok(tokenDto);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String accessToken) {
		jwtService.addBlackList(accessToken);
		return ResponseEntity.ok("로그아웃이 정상적으로 완료되었습니다.");

	}

	@PostMapping("/reissue")
	public ResponseEntity<TokenDto> reissue(@RequestBody ReissueDto reissueDto) {
		TokenDto tokenDto = authService.reissue(reissueDto.refreshToken());
		return ResponseEntity.ok(tokenDto);
	}

	@GetMapping("/email-check")
	public ResponseEntity<Boolean> duplicateCheckEmail(@RequestParam String email) {
		if (authService.duplicateCheckEmail(email)) {
			return ResponseEntity.ok(false);
		}
		return ResponseEntity.ok(true);
	}
}
