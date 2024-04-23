package com.ssafy.backend.domain.approval.service;

import com.ssafy.backend.domain.approval.dto.response.ApprovalResponseDto;

import java.util.List;

public interface ApprovalService {
    // 결제 내역 저장
    void saveApproval(Long loginUserId,  Long bookId, int price);


    // 결제 내역 조회
    List<ApprovalResponseDto> searchApprovals(Long loginUserId);

}
