package com.ssafy.businesscard.domain.myalbum.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumFilterRepository;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumFilterService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
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
        if (request.filterName().isEmpty()) {
            throw new UserException(UserErrorCode.INVALID_FILTER_NAME);
        } else {
            privateAlbumFilterRepository.findByFilterName(request.filterName()).ifPresent(
                    filter -> {throw new UserException(UserErrorCode.ALREADY_IN_FILTER);
            });
            Filter filter = privateAlbumFilterRepository.save(Filter.builder()
                    .filterName(request.filterName())
                    .build());
            saveFilter(userId, filter.getFilterId());
        }

    }

    // 필터 이름 편집
    @Override
    public void update(Long userId, Long filterId, FilterRequest request) {
        if (request.filterName().isEmpty()) {
            throw new UserException(UserErrorCode.INVALID_FILTER_NAME);
        } else {
            privateAlbumFilterRepository.findByFilterName(request.filterName()).ifPresent(
                    filter -> {throw new UserException(UserErrorCode.ALREADY_IN_FILTER);
            });
            privateAlbumFilterRepository.save(Filter.builder()
                    .filterId(filterId)
                    .filterName(request.filterName())
                    .build());
        }
    }

    // 필터 생성 후 filterId와 userId를 중계 테이블에 저장
    private void saveFilter(Long userId, Long filterId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        Filter filter = privateAlbumFilterRepository.findById(filterId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_FILTER));
        privateAlbumMemberRepository.save(PrivateAlbumMember.builder()
                .filter(filter)
                .user(user)
                .build());
    }

    // 필터 삭제
    @Override
    public void delete(Long userId, Long filterId) {
        Filter filter = privateAlbumFilterRepository.findById(filterId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_FILTER));
        privateAlbumFilterRepository.delete(filter);
    }
}
