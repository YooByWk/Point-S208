package com.ssafy.businesscard.myalbum.service;

import com.ssafy.businesscard.card.dto.request.FilterRequest;

public interface PrivateAlbumFilterService {
    void create(Long userId, FilterRequest request);
}
