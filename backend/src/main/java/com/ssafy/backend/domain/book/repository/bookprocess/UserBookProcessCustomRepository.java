package com.ssafy.backend.domain.book.repository.bookprocess;

import com.ssafy.backend.domain.book.entity.BookPage;
import com.ssafy.backend.domain.book.entity.BookPageSentence;
import com.ssafy.backend.domain.education.entity.Education;

import java.util.List;

public interface UserBookProcessCustomRepository {

    List<BookPage> findByBookId(Long bookId);
    List<BookPageSentence> findByBookPageId(List<Long> bookId);
    List<Education> findByBookSentenceId(List<Long> bookPageSentenceId);
}
