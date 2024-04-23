package com.ssafy.backend.domain.book.controller;

import com.ssafy.backend.domain.book.dto.BookDto;
import com.ssafy.backend.domain.book.dto.UserBookProcessDto;
import com.ssafy.backend.domain.book.dto.response.BookInfoResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookPageResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookPurchasedResponseDto;
import com.ssafy.backend.domain.book.mapper.CoverPathMapping;
import com.ssafy.backend.domain.book.service.BookService;
import com.ssafy.backend.global.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    // 책 목록 전체 조회
    @GetMapping
    public ResponseEntity<List<BookPurchasedResponseDto>> searchAllBook(Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        List<BookPurchasedResponseDto> books = bookService.searchAllBook(loginUserId);

        return ResponseEntity.ok(books);
    }

    // 책 정보 조회(책 클릭시)
    @GetMapping("/{bookId}")
    public ResponseEntity<BookInfoResponseDto> searchBookInfo(@PathVariable("bookId") Long bookId, Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        BookInfoResponseDto bookInfo = bookService.searchBookInfo(bookId, loginUserId);

        return ResponseEntity.ok(bookInfo);
    }

    // 책 단일 조회(구매창)
    @GetMapping("/{bookId}/purchase")
    public ResponseEntity<BookDto> searchBook(@PathVariable("bookId") Long bookId,
                                              Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        BookDto bookDto = bookService.searchBook(bookId, loginUserId);

        return ResponseEntity.ok(bookDto);
    }

    // 책 페이지 조회
    @GetMapping("/{bookId}/pages/{page}")
    public  ResponseEntity<BookPageResponseDto> searchBookPage(@PathVariable("bookId") Long bookId, @PathVariable("page") int page) {
        BookPageResponseDto bookPageResponseDto = bookService.searchBookPage(bookId, page);

        return ResponseEntity.ok(bookPageResponseDto);
    }

    // 진행중인 책 조회
    @GetMapping("/my-books")
    public ResponseEntity<List<UserBookProcessDto>> searchProcessBook(Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        List<UserBookProcessDto> processBooks = bookService.searchProcessBook(loginUserId);

        return ResponseEntity.ok(processBooks);
    }

    // 구매한 책 조회
    @GetMapping("/purchased")
    public ResponseEntity<List<BookPurchasedResponseDto>> searchPurchasedBook(Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        List<BookPurchasedResponseDto> purchasedBooks = bookService.searchPurchasedBook(loginUserId);

        return ResponseEntity.ok(purchasedBooks);
    }

    // 다음 페이지로 넘어가기 전 현재 페이지 정보 저장
    @PostMapping("/{bookId}/pages/{page}")
    public ResponseEntity<String> saveProgressBookPage(@PathVariable("bookId") Long bookId, @PathVariable("page") int page, Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        bookService.saveProgressBookPage(loginUserId, bookId, page);

        return ResponseEntity.ok("진행중인 페이지가 저장되었습니다.");
    }

    // 구매 내역 저장 후 구매한 책 테이블에 결과 반영
    @PostMapping("/{bookId}/approval")
    public ResponseEntity<String> savePurchasedBook(@PathVariable("bookId") Long bookId,
                                                    Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        bookService.savePurchasedBook(loginUserId, bookId);

        return ResponseEntity.ok("구매한 책 테이블에 저장되었습니다.");
    }

    // 완독 여부 저장
    @PostMapping("/{bookId}/is-read")
    public ResponseEntity<String> saveIsRead(@PathVariable("bookId") Long bookId,
                                             Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        bookService.saveIsRead(loginUserId, bookId);

        return ResponseEntity.ok("isRead가 저장되었습니다.");
    }

    // 앱 실행시 동화책 표지 이미지 불러오기
    @GetMapping("/cover-images")
    public ResponseEntity<List<CoverPathMapping>> getCoverPath() {
        List<CoverPathMapping> bookCovers = bookService.getCoverPath();

        return ResponseEntity.ok(bookCovers);
    }
}
