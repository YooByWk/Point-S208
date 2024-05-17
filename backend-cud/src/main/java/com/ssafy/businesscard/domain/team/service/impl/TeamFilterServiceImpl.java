package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.mapper.FilterMapper;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumFilterRepository;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumMemberRepository;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumRepository;
import com.ssafy.businesscard.domain.team.service.TeamFilterService;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamFilterServiceImpl implements TeamFilterService {

    private final FilterMapper filterMapper;
    private final TeamAlbumRepository teamAlbumRepository;
    private final TeamAlbumFilterRepository teamAlbumFilterRepository;
    private final TeamAlbumMemberRepository teamAlbumMemberRepository;

    // 필터 생성
    @Override
    public void create(Long userId, Long teamAlbumId, FilterRequest request) {
        if (request.filterName().isEmpty()) {
            throw new UserException(UserErrorCode.INVALID_FILTER_NAME);
        } else {
            teamAlbumMemberRepository.findByTeamAlbum_TeamAlbumIdAndFilter_FilterName(teamAlbumId, request.filterName())
                    .ifPresent(filter -> {throw new UserException(UserErrorCode.ALREADY_IN_FILTER);
                    });
            Filter filter = filterMapper.toEntity(request);
            teamAlbumFilterRepository.save(filter);
            saveFilter(teamAlbumId, filter.getFilterId());
        }

    }

    // 필터 생성 후 filterId와 TeamAlbumId를 중계 테이블에 저장
    private void saveFilter(Long teamAlbumId, Long filterId) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
        Filter filter = findFilter(filterId);
        teamAlbumMemberRepository.save(TeamAlbumMember.builder()
                .filter(filter)
                .teamAlbum(teamAlbum)
                .build());
    }

    // 필터 이름 편집
    @Override
    public void update(Long userId, Long teamAlbumId, Long filterId, FilterRequest request) {
        if (request.filterName().isEmpty()) {
            throw new UserException(UserErrorCode.INVALID_FILTER_NAME);
        } else {
            teamAlbumFilterRepository.findByFilterName(request.filterName()).ifPresent(
                    filter -> {throw new UserException(UserErrorCode.ALREADY_IN_FILTER);
            });
            teamAlbumFilterRepository.save(Filter.builder()
                    .filterId(filterId)
                    .filterName(request.filterName())
                    .build());
        }
    }

    // 필터 삭제
    @Override
    public void delete(Long userId, Long teamAlbumId, Long filterId) {
        Filter filter = findFilter(filterId);
        teamAlbumFilterRepository.delete(filter);
    }

    private Filter findFilter(Long filterId) {
        return teamAlbumFilterRepository.findById(filterId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_FILTER));
    }
}
