package com.ssafy.backend.domain.book.repository.booksentence;

import com.ssafy.backend.domain.book.entity.BookPageSentence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookPageSentenceRepository extends JpaRepository<BookPageSentence, Long> {

}
