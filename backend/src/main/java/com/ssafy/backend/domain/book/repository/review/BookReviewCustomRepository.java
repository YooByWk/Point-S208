package com.ssafy.backend.domain.book.repository.review;

import com.ssafy.backend.domain.book.dto.response.BookReviewMyResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;

import java.util.List;

public interface BookReviewCustomRepository {
    List<BookReviewMyResponseDto> findByUser_userId(Long userId);
    BookReviewResponseDto searchMyReview(Long userId, Long bookId);
}
