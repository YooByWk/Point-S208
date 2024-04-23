package com.ssafy.backend.domain.book.repository.bookpurchased;

import com.ssafy.backend.domain.book.entity.BookPurchasedLearning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookPurchasedRepository extends JpaRepository<BookPurchasedLearning, Long>, BookPurchasedCustomRepository {
    Optional<BookPurchasedLearning> findByBook_bookId(Long bookId);
    Optional<BookPurchasedLearning> findByUser_userIdAndBook_bookId(Long userId, Long BookId);
}
