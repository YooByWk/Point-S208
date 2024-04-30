package com.ssafy.businesscard.domain.card.dto.request;

import lombok.Builder;

@Builder
public record FilterRequest(
        String filterName
) {
}
