package com.ssafy.businesscard.myalbum.service.impl;

import com.ssafy.businesscard.card.dto.request.FilterRequest;
import com.ssafy.businesscard.card.entity.Filter;
import com.ssafy.businesscard.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.myalbum.repository.PrivateAlbumFilterRepository;
import com.ssafy.businesscard.myalbum.repository.PrivateAlbumRepository;
import com.ssafy.businesscard.myalbum.service.PrivateAlbumFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrivateAlbumFilterServiceImpl implements PrivateAlbumFilterService {

    private final PrivateAlbumRepository privateAlbumRepository;
    private final PrivateAlbumFilterRepository privateAlbumFilterRepository;

    // 필터 생성
    @Override
    public void create(Long userId, FilterRequest request) {
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userId(userId);
        privateAlbumFilterRepository.save(Filter.builder()
                        .filterName(request.filterName())
                        .privateAlbum(privateAlbum)
                .build());
    }

    // 필터 수정

    // 필터 삭제
}
