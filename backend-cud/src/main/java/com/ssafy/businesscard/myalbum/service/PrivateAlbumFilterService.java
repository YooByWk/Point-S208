package com.ssafy.businesscard.myalbum.service;

import com.ssafy.businesscard.card.dto.request.FilterRequest;

public interface PrivateAlbumFilterService {
    void create(Long userId, FilterRequest request);

    void update(Long userId, Long filterId, FilterRequest request);
}
