package com.ssafy.businesscard.myalbum.service.impl;

import com.ssafy.businesscard.card.dto.request.FilterRequest;
import com.ssafy.businesscard.card.entity.Filter;
import com.ssafy.businesscard.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.myalbum.repository.PrivateAlbumFilterRepository;
import com.ssafy.businesscard.myalbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.myalbum.repository.PrivateAlbumRepository;
import com.ssafy.businesscard.myalbum.service.PrivateAlbumFilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrivateAlbumFilterServiceImpl implements PrivateAlbumFilterService {

    private final PrivateAlbumRepository privateAlbumRepository;
    private final PrivateAlbumFilterRepository privateAlbumFilterRepository;
    private final PrivateAlbumMemberRepository privateAlbumMemberRepository;

    // 필터 생성
    @Override
    public void create(Long userId, FilterRequest request) {
        Filter filter = privateAlbumFilterRepository.save(Filter.builder()
                .filterName(request.filterName())
                .build());
        saveFilter(userId, filter.getFilterId());
    }

    private void saveFilter(Long userId, Long filterId) {
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userId(userId);
        Optional<Filter> filter = privateAlbumFilterRepository.findById(filterId);
        privateAlbumMemberRepository.save(PrivateAlbumMember.builder()
                        .privateAlbum(privateAlbum)
                        .filter(filter.get())
                .build());
    }

    // 필터 수정

    // 필터 삭제
}
