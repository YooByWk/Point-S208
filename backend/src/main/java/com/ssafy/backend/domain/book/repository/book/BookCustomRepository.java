package com.ssafy.backend.domain.book.repository.book;

import com.ssafy.backend.domain.book.dto.BookDto;

import java.util.Optional;

public interface BookCustomRepository {
    Optional<BookDto> purchasedBookInfo(Long bookId, Long loginUSerId);

}
