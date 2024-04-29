package com.ssafy.businesscard.card.dto.request;

import lombok.Builder;

@Builder
public record FilterRequest(
        String filterName
) {
}
