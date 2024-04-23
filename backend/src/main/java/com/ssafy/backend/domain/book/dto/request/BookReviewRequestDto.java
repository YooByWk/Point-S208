package com.ssafy.backend.domain.book.dto.request;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.Builder;

@Builder
public record BookReviewRequestDto(

        @DecimalMin(value = "0.0")
        @DecimalMax(value = "5.0")
        double score,
        String content
) {
}
