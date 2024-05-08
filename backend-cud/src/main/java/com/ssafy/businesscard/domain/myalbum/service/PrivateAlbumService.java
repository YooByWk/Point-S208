package com.ssafy.businesscard.domain.myalbum.service;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardSharedRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PrivateAlbumService {
    void regist(Long userId, CardRequest request);
    void registCard(Long userId, MultipartFile image, CardRequest request);
    void addFilter(Long userId, Long cardId, List<CardAddFilterRequest> request);
    void updateCard(Long userId, Long cardId, CardRequest request);
    void deleteCard(Long userId, Long cardId);
    String cardMemo(Long userId, Long cardId, MemoRequest request);
    void registSharedCard(Long userId, CardSharedRequest cardSharedRequest);
    void shareCard(Long userId, Long teamId, CardSharedRequest request);
}
