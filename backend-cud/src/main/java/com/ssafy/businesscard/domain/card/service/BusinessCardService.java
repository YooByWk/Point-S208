package com.ssafy.businesscard.domain.card.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BusinessCardService {
    void register(Long userId, List<MultipartFile> cardImages);
}
