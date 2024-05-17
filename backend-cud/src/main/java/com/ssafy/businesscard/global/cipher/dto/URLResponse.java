package com.ssafy.businesscard.global.cipher.dto;

import lombok.Builder;

@Builder
public record URLResponse(
        String url,
        String secretKey
) {
}
