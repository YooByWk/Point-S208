package com.ssafy.businesscard.domain.card.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;


@Builder
public record FilterRequest(
        String filterName
) {
}
