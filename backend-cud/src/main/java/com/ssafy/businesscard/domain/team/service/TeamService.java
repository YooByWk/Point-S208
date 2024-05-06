package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;

public interface TeamService {

    String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest);

    String update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest);

    String delete(Long userId, Long teamId);

    String registCard(Long teamAlbumId, CardRequest request);
}
