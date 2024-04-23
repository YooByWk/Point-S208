package com.ssafy.backend.domain.book.service;

import com.ssafy.backend.domain.book.dto.BookDto;
import com.ssafy.backend.domain.book.dto.UserBookProcessDto;
import com.ssafy.backend.domain.book.dto.response.BookInfoResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookPageResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookPurchasedResponseDto;
import com.ssafy.backend.domain.book.mapper.CoverPathMapping;

import java.util.List;

public interface BookService {

    // 책 정보 전체 조회
    List<BookPurchasedResponseDto> searchAllBook(Long loginUserId);
    // 책 정보 조회(구매창)
    BookDto searchBook(Long bookId, Long loginUserId);
    // 책 페이지 조회
    BookPageResponseDto searchBookPage(Long bookId, int page);
    // 책 정보 조회(책 클릭시)
    BookInfoResponseDto searchBookInfo(Long bookId, Long loginUserId);
    // 현재 진행중인 페이지 저장
    void saveProgressBookPage(Long loginUserId, Long bookId, int page);
    // 진행중인 책 조회
    List<UserBookProcessDto> searchProcessBook(Long loginUserId);
    // 구매한 책 조회
    List<BookPurchasedResponseDto> searchPurchasedBook(Long loginUserId);
    // 구매내역 구매한 책 테이블에 반영
    void savePurchasedBook(Long loginUserId, Long bookId);
    // isRead 여부 저장
    void saveIsRead(Long loginUserId, Long bookId);
    List<CoverPathMapping> getCoverPath();
}
