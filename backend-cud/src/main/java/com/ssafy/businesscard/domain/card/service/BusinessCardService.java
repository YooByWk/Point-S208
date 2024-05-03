package com.ssafy.businesscard.domain.card.service;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BusinessCardService {
    void register(Long userId, List<MultipartFile> cardImages);
    boolean checkCard(Businesscard businesscard);
}
