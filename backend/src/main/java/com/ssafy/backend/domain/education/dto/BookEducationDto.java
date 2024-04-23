package com.ssafy.backend.domain.education.dto;

import lombok.Builder;

@Builder
public record BookEducationDto(
        String wordName,
        String imagePath
) {
}
