package com.ssafy.businesscard.domain.myalbum.service;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;

public interface PrivateAlbumFilterService {
    void create(Long userId, FilterRequest request);

    void update(Long userId, Long filterId, FilterRequest request);

    void delete(Long userId, Long filterId);
}
