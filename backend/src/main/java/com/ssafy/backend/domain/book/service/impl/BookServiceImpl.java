package com.ssafy.backend.domain.book.service.impl;

import com.ssafy.backend.domain.approval.entity.Approval;
import com.ssafy.backend.domain.approval.repository.ApprovalRepository;
import com.ssafy.backend.domain.book.dto.BookDto;
import com.ssafy.backend.domain.book.dto.BookPageSentenceDto;
import com.ssafy.backend.domain.book.dto.UserBookProcessDto;
import com.ssafy.backend.domain.book.dto.response.BookInfoResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookPageResponseDto;
import com.ssafy.backend.domain.book.dto.response.BookPurchasedResponseDto;
import com.ssafy.backend.domain.book.entity.*;
import com.ssafy.backend.domain.book.mapper.BookMapper;
import com.ssafy.backend.domain.book.mapper.CoverPathMapping;
import com.ssafy.backend.domain.book.repository.book.BookRepository;
import com.ssafy.backend.domain.book.repository.bookpage.BookPageRepository;
import com.ssafy.backend.domain.book.repository.bookprocess.UserBookProcessRespository;
import com.ssafy.backend.domain.book.repository.bookpurchased.BookPurchasedRepository;
import com.ssafy.backend.domain.book.service.BookService;
import com.ssafy.backend.domain.book.service.ReviewService;
import com.ssafy.backend.domain.education.dto.BookEducationDto;
import com.ssafy.backend.domain.education.dto.EducationDto;
import com.ssafy.backend.domain.education.entity.Education;
import com.ssafy.backend.domain.education.mapper.EducationMapper;
import com.ssafy.backend.domain.education.repository.education.EducationRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;


@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookPageRepository bookPageRepository;
    private final BookMapper bookMapper;
    private final EducationMapper educationMapper;
    private final UserBookProcessRespository userBookProcessRespository;
    private final UserRepository userRepository;
    private final BookPurchasedRepository bookPurchasedRepository;
    private final ReviewService reviewService;
    private final ApprovalRepository approvalRepository;
    private final EducationRepository educationRepository;

    // 책 정보 전체 조회
    @Override
    public List<BookPurchasedResponseDto> searchAllBook(Long loginUserId) {
        return bookPurchasedRepository.findByUser_userId(loginUserId);
    }

    // 책 정보 조회(구매창)
    @Override
    @Transactional
    public BookDto searchBook(Long bookId, Long loginUserId) {
        BookDto bookDto = bookRepository.purchasedBookInfo(bookId, loginUserId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));
        double averageScore = Math.round(bookDto.averageScore() * 2) / 2.0;

        return bookDto.builder()
                .bookId(bookDto.bookId())
                .title(bookDto.title())
                .summary(bookDto.summary())
                .coverPath(bookDto.coverPath())
                .price(bookDto.price())
                .isPay(bookDto.isPay())
                .averageScore(averageScore)
                .myBookReview(reviewService.searchMyReview(loginUserId, bookId))
                .bookReviews(reviewService.searchReviews(bookId))
                .build();
    }

    // 책 정보 조회(책 클릭시)
    @Override
    public BookInfoResponseDto searchBookInfo(Long bookId, Long loginUserId) {
        // bookId와 loginUserId를 구매한 이용해 책 검색
        BookPurchasedLearning bookPurchasedLearning = bookPurchasedRepository.findByUser_userIdAndBook_bookId(loginUserId, bookId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));

        List<Long> ids = new ArrayList<>();
        List<String> bookPageImagePath = new ArrayList<>();
        List<String> bookSoundPath = new ArrayList<>();
        for (BookPage bookPage : bookPurchasedLearning.getBook().getBookPageList()) {
            bookPageImagePath.add(bookPage.getBookImagePath());
            for (BookPageSentence bookPageSentence : bookPage.getBookPageSentenceList()) {
                ids.add(bookPageSentence.getBookPageSentenceId());
                bookSoundPath.add(bookPageSentence.getSentenceSoundPath());
            }
        }

        int bookProcessPage = getBookProcessPage(loginUserId, bookId);
        int totalPage = bookPurchasedLearning.getBook().getBookPageList().size();

        List<BookEducationDto> educationList = educationRepository.findAllByBookPageSentence_BookPageSentenceIdIn(ids);

        return BookInfoResponseDto.builder()
                .bookId(bookPurchasedLearning.getBook().getBookId())
                .title(bookPurchasedLearning.getBook().getTitle())
                .coverImagePath(bookPurchasedLearning.getBook().getCoverPath())
                .totalPage(totalPage)
                .processPage(bookProcessPage)
                .bookPageImagePathList(bookPageImagePath)
                .bookSoundPathList(bookSoundPath)
                .educationList(educationList)
                .build();
    }

    // 진행중인 페이지 정보 가져오기
    private int getBookProcessPage(Long loginUserId, Long bookId) {
        Optional<UserBookProcess> bookProcesses = userBookProcessRespository.findByUser_userIdAndBook_bookId(loginUserId, bookId);
        int bookProcessePage = 0;
        bookProcessePage = bookProcesses.map(UserBookProcess::getPage).orElse(0);

        return bookProcessePage;
    }

    // 책 페이지 조회
    @Override
    @Transactional
    public BookPageResponseDto searchBookPage(Long bookId, int page) {
        // bookId와 page를 통해 bookPage 조회
        BookPage bookPage = bookPageRepository.findByBookPage(bookId, page)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOKPAGE));

        // bookPageId를 통해 sentence 조회, Dto 변환 후 sentenceId 리스트로 저장
        List<BookPageSentence> sentences = bookPageRepository.findByBookPageId(bookPage.getBookPageId());
        List<BookPageSentenceDto> sentenceDtos = sentences.stream()
                .map(bookMapper::toBookPageSentenceDto)
                .toList();
        List<Long> bookPageSentenceIds = sentences.stream()
                .map(BookPageSentence::getBookPageSentenceId)
                .toList();

        // sentenceId를 이용해 education 조회 후 Dto로 변환
        Education education = bookPageRepository.findByBookSentenceId(bookPageSentenceIds);
        EducationDto educationDto = educationMapper.toEducationDto(education);

        return BookPageResponseDto.builder()
                .bookPageId(bookPage.getBookPageId())
                .bookImagePath(bookPage.getBookImagePath())
                .page(bookPage.getPage())
                .content(bookPage.getContent())
                .bookPageSentences(sentenceDtos)
                .education(educationDto)
                .build();
    }

    // 진행중인 책 조회
    @Override
    @Transactional
    public List<UserBookProcessDto> searchProcessBook(Long loginUserId) {
        List<UserBookProcess> userBookProcesses = userBookProcessRespository.findByUser_userId(loginUserId);

        return userBookProcesses.stream()
                .map(bookMapper::toUserBookProcessDto)
                .toList();
    }

    // 구매한 책 조회
    @Override
    public List<BookPurchasedResponseDto> searchPurchasedBook(Long loginUserId) {
        // 전체 책 목록 조회
        List<BookPurchasedResponseDto> booklists = bookPurchasedRepository.findByUser_userId(loginUserId);
        // Book중 isPay가 true인 booklist만 뽑아서 리스트에 저장
        List<BookPurchasedResponseDto> purchasedResponseDtos = new ArrayList<>();
        for (BookPurchasedResponseDto booklist : booklists) {
            if (booklist.isPay()) {
                purchasedResponseDtos.add(booklist);
            }
        }
        return purchasedResponseDtos;
    }

    // 현재 진행중인 페이지 저장
    @Override
    @Transactional
    public void saveProgressBookPage(Long loginUserId, Long bookId, int page) {
        // userId 와 bookId를 이용해 로그인한 유저와 읽고 있는 책 조회
        User userId = userRepository.findById(loginUserId)
                .orElseThrow(() -> new UserException(INVALID_USER));
        Book processbookId = bookRepository.findById(bookId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));
        Optional<UserBookProcess> userBookProcess = userBookProcessRespository.findByUser_userIdAndBook_bookId(loginUserId, bookId);

        UserBookProcess bookProcess = UserBookProcess.builder()
                .user(userId)
                .book(processbookId)
                .page(page)
                .isRead(userBookProcess.map(UserBookProcess::isRead).orElse(false))
                .build();

        // 읽은 페이지 저장
        userBookProcessRespository.save(bookProcess);
    }

    // 결제 내역 구매한 책 테이블에 반영
    public void savePurchasedBook(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(INVALID_USER));
        Approval approval = approvalRepository.findByUser_userIdAndBook_bookId(user.getUserId(), bookId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));
        
        BookPurchasedLearning purchasedBook = BookPurchasedLearning.builder()
                .user(approval.getUser())
                .book(approval.getBook())
                .build();
        bookPurchasedRepository.save(purchasedBook);
    }

    // isRead 여부 저장
    @Override
    public void saveIsRead(Long loginUserId, Long bookId) {
        UserBookProcess userBookProcess = userBookProcessRespository.findByUser_userIdAndBook_bookId(loginUserId, bookId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));
        boolean isRead = true;

        UserBookProcess bookProcess = UserBookProcess.builder()
                .user(userBookProcess.getUser())
                .book(userBookProcess.getBook())
                .page(userBookProcess.getPage())
                .isRead(isRead)
                .build();

        userBookProcessRespository.save(bookProcess);
    }

    // 앱 실행시 동화책 표지 이미지 불러오기
    @Override
    public List<CoverPathMapping> getCoverPath() {
        List<CoverPathMapping> books = bookRepository.findAllBy();

        return books;
    }
}
