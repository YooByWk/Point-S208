package com.ssafy.businesscard.mycard.dto;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import lombok.Builder;

import java.util.List;

@Builder
public record MycardResponseDto(
        Long cardId,
        String name,
        String company,
        String position,
        String rank,
        String department,
        String email,
        String landlineNumber,
        String faxNumber,
        String phoneNumber,
        String address,
        String realPicture,
        String digitalPicture,
        Businesscard.Status frontBack,
        String domainUrl
) {
}