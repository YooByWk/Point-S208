package com.ssafy.businesscard.domain.myalbum.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.mapper.FilterMapper;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumFilterRepository;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.domain.myalbum.repository.privateAlbum.PrivateAlbumRepository;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumFilterService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PrivateAlbumFilterServiceImpl implements PrivateAlbumFilterService {

    private final UserRepository userRepository;
    private final PrivateAlbumFilterRepository privateAlbumFilterRepository;
    private final PrivateAlbumMemberRepository privateAlbumMemberRepository;

    // 필터 생성
    @Override
    @Transactional
    public void create(Long userId, FilterRequest request) {
        privateAlbumFilterRepository.findByFilterName(request.filterName()).ifPresent(
                filter -> {throw new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.ALREADY_IN_FILTER
                );
            });
        Filter filter = privateAlbumFilterRepository.save(Filter.builder()
                .filterName(request.filterName())
                .build());
        saveFilter(userId, filter.getFilterId());
    }

    // 필터 이름 편집
    @Override
    public void update(Long userId, Long filterId, FilterRequest request) {
        privateAlbumFilterRepository.save(Filter.builder()
                .filterId(filterId)
                .filterName(request.filterName())
                .build());
    }

    // 필터 삭제
    @Override
    public void delete(Long userId, Long filterId) {
        Filter filter = privateAlbumFilterRepository.findById(filterId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_FILTER
                ));
        privateAlbumFilterRepository.delete(filter);
    }

    // 필터 생성 후 filterId와 userId를 중계 테이블에 저장 
    private void saveFilter(Long userId, Long filterId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER));

        Filter filter = privateAlbumFilterRepository.findById(filterId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_FILTER));

        privateAlbumMemberRepository.save(PrivateAlbumMember.builder()
                .filter(filter)
                .user(user)
                .build());
    }

}
