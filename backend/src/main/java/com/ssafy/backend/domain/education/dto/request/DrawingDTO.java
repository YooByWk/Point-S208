package com.ssafy.backend.domain.education.dto.request;

import org.springframework.web.multipart.MultipartFile;

public record DrawingDTO(
		String fileName,
		MultipartFile file
) {
}
