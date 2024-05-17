package com.ssafy.businesscard.privateAlbum.dto;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import lombok.Builder;

@Builder
public record PrivateAlbumResponseDto(
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
        Businesscard.Status frontBack,
        String domainUrl,
        String memo
) {
}
