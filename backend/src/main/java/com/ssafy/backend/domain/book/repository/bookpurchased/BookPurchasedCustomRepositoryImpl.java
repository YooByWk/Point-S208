package com.ssafy.backend.domain.book.repository.bookpurchased;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.book.dto.response.BookPurchasedResponseDto;
import com.ssafy.backend.domain.book.entity.QBook;
import com.ssafy.backend.domain.book.entity.QBookPurchasedLearning;
import com.ssafy.backend.domain.book.entity.QUserBookProcess;

import java.util.List;

public class BookPurchasedCustomRepositoryImpl implements BookPurchasedCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;

    QBook qBook = QBook.book;
    QBookPurchasedLearning qBookPurchasedLearning = QBookPurchasedLearning.bookPurchasedLearning;
    QUserBookProcess qUserBookProcess = QUserBookProcess.userBookProcess;
    public BookPurchasedCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    //@Override
    public List<BookPurchasedResponseDto> findByUser_userId(Long loginUserId) {
        return jpaQueryFactory
                .select(Projections.constructor(
                        BookPurchasedResponseDto.class,
                        qBook.bookId,
                        qBook.title,
                        qBook.coverPath,
                        qBook.price,
                        ExpressionUtils.as(
                                JPAExpressions.select(qBookPurchasedLearning.isNotNull().coalesce(false))
                                        .from(qBookPurchasedLearning)
                                        .where(qBook.bookId.eq(qBookPurchasedLearning.book.bookId)
                                                .and(qBookPurchasedLearning.user.userId.eq(loginUserId))),
                                "isPay"),
                        ExpressionUtils.as(
                                JPAExpressions.select(
                                        qUserBookProcess.isRead.when(true).then(true)
                                                .otherwise(false)
                                )
                                        .from(qUserBookProcess)
                                        .where(qUserBookProcess.book.bookId.eq(qBook.bookId)
                                                .and(qUserBookProcess.user.userId.eq(loginUserId))),
                                "isRead")
                ))
                .from(qBook)
                .fetch();
    }
}
