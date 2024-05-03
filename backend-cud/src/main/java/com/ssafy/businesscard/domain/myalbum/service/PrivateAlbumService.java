package com.ssafy.businesscard.domain.myalbum.service;

import com.ssafy.businesscard.domain.myalbum.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardRequest;

import java.util.List;

public interface PrivateAlbumService {
    void registCard(Long userId, CardRequest request);
    void addFilter(Long userId, Long cardId, List<CardAddFilterRequest> request);

    void updateCard(Long userId, Long cardId, CardRequest request);

    void deleteCard(Long userId, Long cardId);
}
