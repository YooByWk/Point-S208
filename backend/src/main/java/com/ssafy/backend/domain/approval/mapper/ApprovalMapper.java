package com.ssafy.backend.domain.approval.mapper;

import com.ssafy.backend.domain.approval.dto.ApprovalDto;
import com.ssafy.backend.domain.approval.dto.response.ApprovalResponseDto;
import com.ssafy.backend.domain.approval.entity.Approval;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ApprovalMapper {
    Approval toApproval(ApprovalDto approvalDto);

    @Mapping(source = "approval.book.bookId", target = "bookId")
    @Mapping(source = "approval.book.title", target = "bookTitle")
    @Mapping(source = "approval.book.coverPath", target = "coverPath")
    ApprovalResponseDto toApprovalResponseDto(Approval approval);
}
