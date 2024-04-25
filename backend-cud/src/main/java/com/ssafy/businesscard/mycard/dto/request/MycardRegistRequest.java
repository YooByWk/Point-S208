package com.ssafy.businesscard.mycard.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ssafy.businesscard.card.entity.Businesscard;
import com.ssafy.businesscard.user.entity.User;
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
