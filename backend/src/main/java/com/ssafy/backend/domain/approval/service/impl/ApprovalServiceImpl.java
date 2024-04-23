package com.ssafy.backend.domain.approval.service.impl;

import com.ssafy.backend.domain.approval.dto.ApprovalDto;
import com.ssafy.backend.domain.approval.dto.response.ApprovalResponseDto;
import com.ssafy.backend.domain.approval.entity.Approval;
import com.ssafy.backend.domain.approval.mapper.ApprovalMapper;
import com.ssafy.backend.domain.approval.repository.ApprovalRepository;
import com.ssafy.backend.domain.approval.service.ApprovalService;
import com.ssafy.backend.domain.book.entity.Book;
import com.ssafy.backend.domain.book.repository.book.BookRepository;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.global.error.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.ssafy.backend.global.error.exception.ExceptionType.INVALID_USER;
import static com.ssafy.backend.global.error.exception.ExceptionType.NOT_FOUND_BOOK;

@Service
@RequiredArgsConstructor
public class ApprovalServiceImpl implements ApprovalService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final ApprovalMapper approvalMapper;
    private final ApprovalRepository approvalRepository;


    // 결제 내역 저장
    @Override
    public void saveApproval(Long loginUserId,  Long bookId, int price) {
        User userId = userRepository.findById(loginUserId)
                .orElseThrow(() -> new UserException(INVALID_USER));
        Book purchasedBookId = bookRepository.findById(bookId)
                .orElseThrow(() -> new UserException(NOT_FOUND_BOOK));

        ApprovalDto approvalDto = ApprovalDto.builder()
                .price(purchasedBookId.getPrice())
                .user(userId)
                .book(purchasedBookId)
                .build();

        Approval approval = approvalMapper.toApproval(approvalDto);
        approvalRepository.save(approval);

    }

    // 결제 내역 조회
    @Override
    public List<ApprovalResponseDto> searchApprovals(Long loginUserId) {
        List<Approval> approvals = approvalRepository.findByUser_userId(loginUserId);
        List<ApprovalResponseDto> approvalList = approvals.stream()
                .map(approvalMapper::toApprovalResponseDto)
                .toList();
        return approvalList;
    }

}
