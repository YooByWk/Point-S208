package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TeamAlbumCardService {
    void regist(Long userId, Long teamAlbumId, CardRequest request);
    void registCard(Long userId, Long teamAlbumId, MultipartFile image, CardRequest request);
    void updateCard(Long userId, Long teamAlbumId, Long cardId, CardRequest request);
    void deleteCard(Long userId, Long teamAlbumId, Long cardId);
    void addFilter(Long userId, Long teamAlbumId, Long cardId, List<CardAddFilterRequest> requestList);
    String cardMemo(Long userId, Long teamAlbumId, Long cardId, MemoRequest request);
    void deleteFilter(Long userId, Long teamAlbumId, Long cardId, Long filterId);
}
