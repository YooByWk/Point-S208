package com.ssafy.backend.domain.book.controller;


import com.ssafy.backend.domain.book.dto.request.BookReviewRequestDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewMyResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;
import com.ssafy.backend.domain.book.service.ReviewService;
import com.ssafy.backend.global.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // 리뷰 등록
    @PostMapping("{bookId}/review")
    public ResponseEntity<String> createReview(@PathVariable("bookId") Long bookId,
                                               @RequestBody BookReviewRequestDto bookReviewRequestDto,
                                               Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        reviewService.createReview(loginUserId, bookId, bookReviewRequestDto);

        return ResponseEntity.ok("리뷰가 등록되었습니다.");
    }

    // 책에 남겨진 리뷰 조회
    @GetMapping("{bookId}/reviews")
    public ResponseEntity<List<BookReviewResponseDto>> searchReviews(@PathVariable("bookId") Long bookId) {
        List<BookReviewResponseDto> bookReviews = reviewService.searchReviews(bookId);

        return ResponseEntity.ok(bookReviews);
    }

    // 내가 남긴 리뷰 조회
    @GetMapping("/my-reviews")
    public ResponseEntity<List<BookReviewMyResponseDto>> searchMyReviews(Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        List<BookReviewMyResponseDto> myReviews = reviewService.searchMyReviews(loginUserId);

        return ResponseEntity.ok(myReviews);
    }

    // 내가 남긴 리뷰 수정
    @PutMapping("/{bookId}/review")
    public ResponseEntity<String> changeMyReview(@PathVariable("bookId") Long bookId,
                                                 @RequestBody BookReviewRequestDto bookReviewRequestDto,
                                                 Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        reviewService.changeMyReview(bookId, loginUserId, bookReviewRequestDto);

        return ResponseEntity.ok("리뷰 수정이 완료되었습니다.");
    }

    // 내가 남긴 리뷰 삭제
    @DeleteMapping("/{bookId}/review")
    public ResponseEntity<String> deleteMyReview(@PathVariable("bookId") Long bookId,
                                                 Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        reviewService.deleteMyReview(bookId, loginUserId);

        return ResponseEntity.ok("리뷰가 삭제되었습니다.");
    }
}
