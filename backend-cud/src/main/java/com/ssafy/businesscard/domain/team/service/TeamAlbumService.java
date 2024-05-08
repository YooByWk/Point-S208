package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.team.dto.request.MemberRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TeamAlbumService {

    void create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest);
    void createTeamAlbum(Long userId, TeamAlbumRegistRequest teamAlbumRequest);
    String update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest);

    String delete(Long userId, Long teamId);

    String regist(Long userId, Long teamAlbumId, CardRequest request);
    void registCard(Long userId, Long teamAlbumId, MultipartFile image, CardRequest request);
    void updateCard(Long userId, Long teamAlbumId, Long cardId, CardRequest request);

    void deleteCard(Long userId, Long teamAlbumId, Long cardId);

    void addFilter(Long userId, Long teamAlbumId, Long cardId, List<CardAddFilterRequest> requestList);

    String cardMemo(Long userId, Long teamAlbumId, Long cardId, MemoRequest request);

    void addMember(Long userId, Long teamAlbumId, MemberRequest request);

    void deleteMember(Long userId, Long teamAlbumId, Long memberId);

}
