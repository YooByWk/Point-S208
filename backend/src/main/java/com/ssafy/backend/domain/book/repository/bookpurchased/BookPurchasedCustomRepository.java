package com.ssafy.backend.domain.book.repository.bookpurchased;

import com.ssafy.backend.domain.book.dto.response.BookPurchasedResponseDto;

import java.util.List;

public interface BookPurchasedCustomRepository {
    List<BookPurchasedResponseDto> findByUser_userId(Long loginUserId);
}
