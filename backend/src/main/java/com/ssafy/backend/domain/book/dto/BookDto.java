package com.ssafy.backend.domain.book.dto;

import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;
import lombok.Builder;

import java.util.List;

@Builder
public record BookDto(
        Long bookId,
        String title,
        String summary,
        String coverPath,
        int price,
        boolean isPay,
        Double averageScore,
        BookReviewResponseDto myBookReview,
        List<BookReviewResponseDto> bookReviews
)
{
    public BookDto(Long bookId, String title, String summary, String coverPath, int price, double averageScore, boolean isPay ) {
        this(bookId, title, summary, coverPath, price, isPay, averageScore, null, null);
    }
}
