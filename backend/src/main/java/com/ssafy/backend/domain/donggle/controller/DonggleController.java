package com.ssafy.backend.domain.donggle.controller;

import com.ssafy.backend.domain.donggle.dto.response.DonggleResponseDto;
import com.ssafy.backend.domain.donggle.entity.Donggle;
import com.ssafy.backend.domain.donggle.service.DonggleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/donggle")
public class DonggleController {
	private final DonggleService donggleService;

	@GetMapping("/message")
	public ResponseEntity<DonggleResponseDto> getDonggleMessage(@RequestParam Donggle.Situation situation) {
		DonggleResponseDto donggleResponseDto = donggleService.getDonggleMessage(situation);
		return ResponseEntity.ok(donggleResponseDto);
	}
}
