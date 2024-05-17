package com.ssafy.businesscard.domain.mycard.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public record MycardRegistRequest(
        String name,
        String company,
        String department,
        String position,
        String email,
        String landlineNumber,
        String phoneNumber,
        String realPicture,
        String digitalPicture,
        Businesscard.Status frontBack

) {
}
