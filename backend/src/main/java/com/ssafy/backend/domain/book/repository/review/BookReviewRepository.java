package com.ssafy.backend.domain.book.repository.review;

import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;
import com.ssafy.backend.domain.book.entity.BookReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookReviewRepository extends JpaRepository<BookReview, Long>, BookReviewCustomRepository{
    List<BookReviewResponseDto> findByBook_bookId(Long bookId);

    Optional<BookReview> findByBook_bookIdAndUser_userId(Long bookId, Long userId);
}
