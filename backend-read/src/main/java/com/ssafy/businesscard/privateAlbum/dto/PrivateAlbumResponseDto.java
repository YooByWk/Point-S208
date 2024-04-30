package com.ssafy.businesscard.privateAlbum.dto;

import com.ssafy.businesscard.mycard.entity.Businesscard;

public record PrivateAlbumResponseDto(
        Long cardId,
        String name,
        String company,
        String position,
        String rank,
        String email,
        String landlineNumber,
        String faxNumber,
        String phoneNumber,
        String address,
        String realPicture,
        Businesscard.Status frontBack,
        String domainUrl
) {
}
