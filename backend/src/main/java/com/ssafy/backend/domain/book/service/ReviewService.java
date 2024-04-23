package com.ssafy.backend.domain.book.service;

import com.ssafy.backend.domain.book.dto.request.BookReviewRequestDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewMyResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;

import java.util.List;

public interface ReviewService {

    // 리뷰 등록
    void createReview(Long loginUserId, Long bookId, BookReviewRequestDto bookReviewRequestDto);
    // 리뷰 전체 조회
    List<BookReviewResponseDto> searchReviews(Long bookId);
    // 내가 작성한 리뷰 조회
    List<BookReviewMyResponseDto> searchMyReviews(Long loginUserId);
    // 내가 작정한 리뷰 수정
    void changeMyReview(Long bookId, Long loginUserId, BookReviewRequestDto bookReviewRequestDto);
    // 내가 작성한 리뷰 삭제
    void deleteMyReview(Long bookId, Long loginUserId);
    // 해당 책에 내가 남긴 리뷰 조회
    BookReviewResponseDto searchMyReview(Long userId, Long bookId);

}
