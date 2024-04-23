package com.ssafy.backend.domain.book.repository.book;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.book.dto.BookDto;
import com.ssafy.backend.domain.book.entity.QBook;
import com.ssafy.backend.domain.book.entity.QBookPurchasedLearning;
import com.ssafy.backend.domain.book.entity.QBookReview;

import java.util.Optional;

public class BookCustomRepositoryImpl implements BookCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;
    QBookReview qBookReview = QBookReview.bookReview;
    QBookPurchasedLearning qBookPurchasedLearning = QBookPurchasedLearning.bookPurchasedLearning;

    public BookCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Optional<BookDto> purchasedBookInfo(Long bookId, Long loginUSerId) {
        return Optional.ofNullable(jpaQueryFactory
                .select(Projections.constructor(BookDto.class,
                        qBook.bookId,
                        qBook.title,
                        qBook.summary,
                        qBook.coverPath,
                        qBook.price,
                        qBookReview.score.avg().nullif(0.0),
                        ExpressionUtils.as(
                                JPAExpressions.select(qBookPurchasedLearning.isNotNull().coalesce(false))
                                        .from(qBookPurchasedLearning)
                                        .where(qBook.bookId.eq(qBookPurchasedLearning.book.bookId)
                                                .and(qBookPurchasedLearning.user.userId.eq(loginUSerId))),
                                "isPay"))
                )
                .from(qBook)
                .leftJoin(qBookReview)
                .on(qBook.bookId.eq(qBookReview.book.bookId))
                .groupBy(qBook.bookId)
                .where(qBook.bookId.eq(bookId))
                .fetchOne());
    }
}
