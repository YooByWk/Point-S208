package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;

public interface TeamService {

    String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest);

}
