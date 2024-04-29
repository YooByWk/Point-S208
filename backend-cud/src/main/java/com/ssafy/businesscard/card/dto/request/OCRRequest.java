package com.ssafy.businesscard.card.dto.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record OCRRequest(
        String version,
        String requestId,
        long timestamp,
        List<ImageFormRequest> images,
        List<MultipartFile> cardImages
) {
}
