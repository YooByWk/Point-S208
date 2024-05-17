package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;

public interface TeamFilterService {
    void create(Long userId, Long teamAlbumId, FilterRequest request);

    void update(Long userId, Long teamAlbumId, Long filterId, FilterRequest request);

    void delete(Long userId, Long teamAlbumId, Long filterId);
}
