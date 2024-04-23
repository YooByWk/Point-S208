package com.ssafy.backend.domain.book.repository.bookpage;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.book.entity.*;
import com.ssafy.backend.domain.education.entity.Education;
import com.ssafy.backend.domain.education.entity.QEducation;

import java.util.List;
import java.util.Optional;

public class BookPageCustomRepositoryImpl implements BookPageCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;
    QBookPage qBookPage = QBookPage.bookPage;
    QBook qBook = QBook.book;
    QBookPageSentence qBookPageSentence = QBookPageSentence.bookPageSentence;
    QEducation qEducation = QEducation.education;
    public BookPageCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public Optional<BookPage> findByBookPage(Long bookId, int bookPage) {
        return Optional.ofNullable(jpaQueryFactory
                .select(qBookPage)
                .from(qBook)
                .innerJoin(qBookPage)
                .on(qBook.bookId.eq(qBookPage.book.bookId))
                .where(qBook.bookId.eq(bookId).and(qBookPage.page.eq(bookPage)))
                .fetchOne());
    }

    @Override
    public List<BookPageSentence> findByBookPageId(Long bookPageId) {
        return jpaQueryFactory
                .select(qBookPageSentence)
                .from(qBookPage)
                .innerJoin(qBookPageSentence)
                .on(qBookPage.bookPageId.eq(qBookPageSentence.bookPage.bookPageId))
                .where(qBookPage.bookPageId.eq(bookPageId))
                .fetch();
    }

    @Override
    public Education findByBookSentenceId(List<Long> bookPageSentenceId) {
        return jpaQueryFactory
                .select(qEducation)
                .from(qBookPageSentence)
                .innerJoin(qEducation)
                .on(qBookPageSentence.bookPageSentenceId.eq(qEducation.bookPageSentence.bookPageSentenceId))
                .where(qBookPageSentence.bookPageSentenceId.in(bookPageSentenceId))
                .fetchOne();
    }
}
