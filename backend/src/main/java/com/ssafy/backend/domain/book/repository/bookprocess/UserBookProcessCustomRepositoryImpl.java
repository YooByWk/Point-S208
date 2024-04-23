package com.ssafy.backend.domain.book.repository.bookprocess;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.book.entity.*;
import com.ssafy.backend.domain.education.entity.Education;
import com.ssafy.backend.domain.education.entity.QEducation;

import java.util.List;

public class UserBookProcessCustomRepositoryImpl implements UserBookProcessCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;
    QBook qBook = QBook.book;
    QBookPage qBookPage = QBookPage.bookPage;
    QBookPageSentence qBookPageSentence = QBookPageSentence.bookPageSentence;
    QEducation qEducation = QEducation.education;
    QUserBookProcess qUserBookProcess = QUserBookProcess.userBookProcess;


    public UserBookProcessCustomRepositoryImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<BookPage> findByBookId(Long bookId) {
        return jpaQueryFactory
                .select(qBookPage)
                .from(qBook)
                .innerJoin(qBookPage)
                .on(qBook.bookId.eq(qBookPage.book.bookId))
                .where(qBook.bookId.eq(bookId))
                .fetch();
    }

    @Override
    public List<BookPageSentence> findByBookPageId(List<Long> bookId) {
        return jpaQueryFactory
                .select(qBookPageSentence)
                .from(qBookPage)
                .innerJoin(qBookPageSentence)
                .on(qBookPage.bookPageId.eq(qBookPageSentence.bookPage.bookPageId))
                .where(qBookPage.bookPageId.in(bookId))
                .fetch();
    }

    @Override
    public List<Education> findByBookSentenceId(List<Long> bookPageSentenceId) {
        return jpaQueryFactory
                .select(qEducation)
                .from(qBookPageSentence)
                .innerJoin(qEducation)
                .on(qBookPageSentence.bookPageSentenceId.eq(qEducation.bookPageSentence.bookPageSentenceId))
                .where(qBookPageSentence.bookPageSentenceId.in(bookPageSentenceId))
                .fetch();
    }


}
