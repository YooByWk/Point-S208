package com.ssafy.businesscard.domain.myalbum.service;

import com.ssafy.businesscard.domain.myalbum.dto.request.CardAddFilterRequest;

import java.util.List;

public interface PrivateAlbumService {
    void addFilter(Long userId, Long cardId, List<CardAddFilterRequest> request);
}
