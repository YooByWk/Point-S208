package com.ssafy.backend.domain.book.dto.response;

import lombok.Builder;

@Builder
public record BookReviewResponseDto(
        double score,
        String content
) {

}
