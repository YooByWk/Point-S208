package com.ssafy.businesscard.domain.team.service;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;

public interface TeamFilterService {
    void create(Long teamAlbumId, FilterRequest request);
}
