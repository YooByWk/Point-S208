package com.ssafy.backend.domain.book.repository.review;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.book.dto.response.BookReviewMyResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookReviewResponseDto;
import com.ssafy.backend.domain.book.entity.QBook;
import com.ssafy.backend.domain.book.entity.QBookReview;

import java.util.List;

public class BookReviewCustomRepositoryImpl implements BookReviewCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;
    QBookReview qBookReview = QBookReview.bookReview;

    public BookReviewCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<BookReviewMyResponseDto> findByUser_userId(Long userId) {
        return jpaQueryFactory
                .select(Projections.constructor(BookReviewMyResponseDto.class,
                        qBook.bookId,
                        qBookReview.user.userId,
                        qBook.title,
                        qBook.coverPath,
                        qBookReview.score,
                        qBookReview.content))
                .from(qBook)
                .join(qBookReview)
                .on(qBook.bookId.eq(qBookReview.book.bookId))
                .where(qBookReview.user.userId.eq(userId))
                .fetch();
    }

    @Override
    public BookReviewResponseDto searchMyReview(Long userId, Long bookId) {
        return jpaQueryFactory
                .select(Projections.constructor(BookReviewResponseDto.class,
                        qBookReview.score,
                        qBookReview.content))
                .from(qBook)
                .join(qBookReview)
                .on(qBook.bookId.eq(qBookReview.book.bookId))
                .where(qBook.bookId.eq(bookId).and(qBookReview.user.userId.eq(userId)))
                .fetchFirst();
    }

}
