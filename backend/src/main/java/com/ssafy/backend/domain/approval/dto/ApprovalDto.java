package com.ssafy.backend.domain.approval.dto;

import com.ssafy.backend.domain.book.entity.Book;
import com.ssafy.backend.domain.user.entity.User;
import lombok.Builder;

@Builder
public record ApprovalDto(
        int price,
        User user,
        Book book
) {
}
