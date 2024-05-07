package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;

import java.util.List;

public interface TeamAlbumService {

    String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest);

    String update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest);

    String delete(Long userId, Long teamId);

    String registCard(Long teamAlbumId, CardRequest request);

    void updateCard(Long teamAlbumId, Long cardId, CardRequest request);

    void deleteCard(Long teamAlbumId, Long cardId);

    void addFilter(Long teamAlbumId, Long cardId, List<CardAddFilterRequest> requestList);

    String cardMemo(Long teamAlbumId, Long cardId, MemoRequest request);
}
