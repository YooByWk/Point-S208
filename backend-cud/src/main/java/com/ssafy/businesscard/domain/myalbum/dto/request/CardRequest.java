package com.ssafy.businesscard.domain.myalbum.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.domain.card.entity.Businesscard;

public record CardRequest(
        @JsonIgnore
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
        String domainUrl
) {
}
