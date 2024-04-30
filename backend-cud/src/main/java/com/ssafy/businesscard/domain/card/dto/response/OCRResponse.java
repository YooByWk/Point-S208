package com.ssafy.businesscard.domain.card.dto.response;

import java.util.List;

public record OCRResponse(
        String name,
        String company,
        String department,
        String position,
        String address,
        String phoneNumber,
        String landlineNumber,
        String faxNumber,
        String email,
        String domainUrl
) {
}
