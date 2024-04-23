package com.ssafy.backend.domain.book.service.impl;

import com.ssafy.backend.domain.book.dto.request.BookReviewRequestDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewMyResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;
import com.ssafy.backend.domain.book.entity.Book;
import com.ssafy.backend.domain.book.entity.BookReview;
import com.ssafy.backend.domain.book.repository.book.BookRepository;
import com.ssafy.backend.domain.book.repository.review.BookReviewRepository;
import com.ssafy.backend.domain.book.service.ReviewService;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BookReviewRepository bookReviewRepository;

    // 리뷰 등록
    @Override
    @Transactional
    public void createReview(Long loginUserId, Long bookId, BookReviewRequestDto bookReviewRequestDto) {
        User userId = userRepository.findById(loginUserId)
                .orElseThrow(() -> new UserException(INVALID_USER));
        Book reviewBookId = bookRepository.findById(bookId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));
        System.out.println("BookReviewRequestDto : " + bookReviewRequestDto);
        BookReview bookReview = BookReview.builder()
                .user(userId)
                .book(reviewBookId)
                .score(bookReviewRequestDto.score())
                .content(bookReviewRequestDto.content())
                .build();

        bookReviewRepository.save(bookReview);
    }

    // 리뷰 전체 조회
    @Override
    public List<BookReviewResponseDto> searchReviews(Long bookId) {
        return bookReviewRepository.findByBook_bookId(bookId);
    }

    // 내가 작성한 모든 리뷰 조회
    @Override
    public List<BookReviewMyResponseDto> searchMyReviews(Long loginUserId) {
        return bookReviewRepository.findByUser_userId(loginUserId);
    }

    // 내가 남긴 리뷰 수정
    @Override
    public void changeMyReview(Long bookId, Long loginUserId, BookReviewRequestDto bookReviewRequestDto) {
        User userId = userRepository.findById(loginUserId)
                .orElseThrow(() -> new UserException(INVALID_USER));
        BookReview bookReview = bookReviewRepository.findByBook_bookIdAndUser_userId(bookId, loginUserId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOKREVIEW));

        BookReview myBookReview = BookReview.builder()
                .user(userId)
                .book(bookReview.getBook())
                .score(bookReviewRequestDto.score())
                .content(bookReviewRequestDto.content())
                .build();

        bookReviewRepository.save(myBookReview);
    }

    // 내가 남긴 리뷰 삭제
    @Override
    public void deleteMyReview(Long bookId, Long loginUserId) {
        BookReview bookReview = bookReviewRepository.findByBook_bookIdAndUser_userId(bookId, loginUserId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOKREVIEW));

        bookReviewRepository.delete(bookReview);
    }

    // 해당 책에 내가 남긴 리뷰 조회
    @Override
    public BookReviewResponseDto searchMyReview(Long userId, Long bookId) {
        return bookReviewRepository.searchMyReview(userId, bookId);
    }

}
