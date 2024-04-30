package com.ssafy.businesscard.domain.myalbum.dto.request;

public record UpdateCardRequest(
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
        String frontBack,
        String doaminUrl
) {
}
