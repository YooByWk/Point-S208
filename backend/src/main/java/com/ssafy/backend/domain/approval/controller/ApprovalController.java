package com.ssafy.backend.domain.approval.controller;

import com.ssafy.backend.domain.approval.dto.response.ApprovalResponseDto;
import com.ssafy.backend.domain.approval.service.ApprovalService;
import com.ssafy.backend.global.util.AuthenticationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/approvals")
@RequiredArgsConstructor
public class ApprovalController {

    private final ApprovalService approvalService;

    // 결제내역 저장
    @PostMapping("{bookId}")
    public ResponseEntity<String> saveApproval(@PathVariable("bookId") Long bookId,
                                                Authentication authentication,
                                                @RequestParam int price) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        approvalService.saveApproval(loginUserId, bookId, price);

        return ResponseEntity.ok("결제 내역이 저장되었습니다.");
    }

    // 결제 내역 조회
    @GetMapping
    public ResponseEntity<List<ApprovalResponseDto>> searchApprovals(Authentication authentication) {
        Long loginUserId = AuthenticationUtil.getCurrentUserId(authentication);
        List<ApprovalResponseDto> approvals =  approvalService.searchApprovals(loginUserId);

        return ResponseEntity.ok(approvals);
    }
}
