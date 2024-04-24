package com.ssafy.businesscard.mycard.model.dto.request;

import com.ssafy.businesscard.card.model.entity.Businesscard;
import com.ssafy.businesscard.user.entity.User;
import lombok.Builder;

@Builder
public record MycardRegistRequest(
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
        String digitalPicture,
        Businesscard.Status frontBack,
        String domainUrl,
        User user

) {
}
