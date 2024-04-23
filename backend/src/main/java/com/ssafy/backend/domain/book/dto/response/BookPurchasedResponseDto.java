package com.ssafy.backend.domain.book.dto.response;

import lombok.Builder;

@Builder
public record BookPurchasedResponseDto(
        Long bookId,
        String title,
        String coverPath,
        int price,
        boolean isPay,
        boolean isRead
) {
}
