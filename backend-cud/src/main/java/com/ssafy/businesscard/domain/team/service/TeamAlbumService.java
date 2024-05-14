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
    void update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest);
    void delete(Long userId, Long teamId);
    void addMember(Long userId, Long teamAlbumId, MemberRequest request);
    void deleteMember(Long userId, Long teamAlbumId, Long memberId);
}
