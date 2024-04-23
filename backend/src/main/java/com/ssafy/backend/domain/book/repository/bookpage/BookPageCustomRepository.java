package com.ssafy.backend.domain.book.repository.bookpage;

import com.ssafy.backend.domain.book.entity.BookPage;
import com.ssafy.backend.domain.book.entity.BookPageSentence;
import com.ssafy.backend.domain.education.entity.Education;

import java.util.List;
import java.util.Optional;

public interface BookPageCustomRepository {

    Optional<BookPage> findByBookPage(Long bookId, int bookPage);

    List<BookPageSentence> findByBookPageId(Long bookPageId);

    Education findByBookSentenceId(List<Long> bookPageSentenceId);


}
