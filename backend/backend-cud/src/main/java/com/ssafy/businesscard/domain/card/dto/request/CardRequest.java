package com.ssafy.businesscard.domain.card.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import lombok.Setter;

public record CardRequest(
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
