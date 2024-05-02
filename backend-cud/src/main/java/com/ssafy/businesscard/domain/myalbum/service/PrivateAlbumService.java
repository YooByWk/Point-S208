package com.ssafy.businesscard.domain.myalbum.service;

import com.ssafy.businesscard.domain.myalbum.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.UpdateCardRequest;

import java.util.List;

public interface PrivateAlbumService {
    void addFilter(Long userId, Long cardId, List<CardAddFilterRequest> request);

    void updateCard(Long userId, Long cardId, UpdateCardRequest request);

    void deleteCard(Long userId, Long cardId);
}
