package com.ssafy.backend.domain.user.controller;

import com.ssafy.backend.domain.user.service.AuthService;
import com.ssafy.backend.domain.user.service.OauthInterface;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import com.ssafy.backend.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/oauth")
public class OauthController {

	private final AuthService authService;
	private final JwtService jwtService;
	private final OauthInterface oauthInterface;


	@PostMapping(value = "/sns-login")
	public ResponseEntity<TokenDto> oauthLogin(@RequestParam String provider,
											   @RequestParam(required = false) String token,
											   @RequestParam(required = false) String email) {
		UserInfoDto userInfoDto = null;
		if(provider.equals("KAKAO")) {
			userInfoDto = authService.SNSLogin(provider, email);
		} else {
			Map<String, Object> userinfo  = oauthInterface.getUserInfo(provider, token);
			userInfoDto = authService.SNSLogin(provider, (String) userinfo.get("email"));
		}
		TokenDto tokenDto = jwtService.issueToken(userInfoDto);
		return ResponseEntity.ok(tokenDto);
	}
}