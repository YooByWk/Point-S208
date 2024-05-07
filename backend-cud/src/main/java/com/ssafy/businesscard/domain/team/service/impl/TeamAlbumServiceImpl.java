package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.mapper.BusinesscardMapper;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumDetailRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamMemberRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
import com.ssafy.businesscard.domain.team.entity.TeamMember;
import com.ssafy.businesscard.domain.team.repository.*;
import com.ssafy.businesscard.domain.team.service.TeamAlbumService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamAlbumServiceImpl implements TeamAlbumService {

    private final UserRepository userRepository;
    private final TeamAlbumRepository teamAlbumRepository;
    private final BusinesscardMapper businesscardMapper;
    private final BusinesscardRepository businesscardRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;
    private final TeamAlbumFilterRepository teamAlbumFilterRepository;
    private final TeamAlbumMemberRepository teamAlbumMemberRepository;
    private final TeamMemberRepository teamMemberRepository;

    // 팀 명함지갑 생성(건너뛰기)
    @Override
    @Transactional
    public String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);
        TeamAlbum checkTeamAlbum = teamAlbumRepository.findByUser_userIdAndTeamName(userId, teamAlbumRegistRequest.teamName());
        if (checkTeamAlbum == null) {
            TeamAlbum teamAlbum = teamAlbumRepository.save(TeamAlbum.builder()
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .user(user)
                    .teamAlbum(teamAlbum)
                    .build();
            String resultMember = addTeamMember(teamMemberRequest);
            return verification(resultMember);

        } else {
            return "이미 존재하는 팀입니다.";
        }
    }

    // 팀 명함지갑 생성시 팀 구성원에 등록
    private String addTeamMember(TeamMemberRequest teamMemberRequest) {
        teamMemberRepository.save(TeamMember.builder()
                .user(teamMemberRequest.user())
                .teamAlbum(teamMemberRequest.teamAlbum())
                .build());
        return "okay";
    }

    private String verification(String resultMember) {
        if (resultMember.equals("okay")) {
            return "팀이 생성되었습니다.";
        } else {
            return "팀 생성에 실패하였습니다.";
        }
    }

    // 팀 명함지갑 이름 수정
    @Override
    @Transactional
    public String update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);

        TeamAlbum teamAlbum = findTeam(teamId);

        if (teamAlbum.getUser().equals(user)) {
            teamAlbumRepository.save(TeamAlbum.builder()
                    .teamAlbumId(teamAlbum.getTeamAlbumId())
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());
            return "팀 이름이 변경되었습니다.";
        } else {
            return "Owner가 아닙니다.";
        }

    }

    // 팀 명함지갑 삭제
    @Override
    @Transactional
    public String delete(Long userId, Long teamId) {
        User user = findUser(userId);
        TeamAlbum teamAlbum = findTeam(teamId);
        if (teamAlbum.getUser().equals(user)) {
            teamAlbumRepository.delete(teamAlbum);
            return "팀 명함지갑이 삭제되었습니다.";
        } else {
            return "Owner가 아닙니다.";
        }
    }

    // 팀 명함지갑에 명함 등록
    @Override
    @Transactional
    public String registCard(Long teamAlbumId, CardRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
                ));
        Businesscard businesscard = businesscardMapper.toEntity(request);

        if (isCardExist(teamAlbum.getTeamAlbumId(), businesscard)) {
            return "이미 등록된 명함입니다.";
        } else {
            businesscardRepository.save(businesscard);
            TeamAlbumDetailRequest teamAlbumDetailRequest = TeamAlbumDetailRequest.builder()
                    .teamAlbum(teamAlbum)
                    .businesscard(businesscard)
                    .memo(null)
                    .build();
            return addCardToTeamAlbumDetail(teamAlbumDetailRequest);
        }

    }


    // 명함 중복 검사
    private boolean isCardExist(Long teamAlbumId, Businesscard businesscard) {
        List<TeamAlbumDetail> teamAlbumDetailList = teamAlbumDetailRepository.findAllByTeamAlbum_teamAlbumId(teamAlbumId);
        for (TeamAlbumDetail teamAlbumDetail : teamAlbumDetailList) {
            if (teamAlbumDetail.getBusinesscard() != null &&
                    teamAlbumDetail.getBusinesscard().getEmail().equals(businesscard.getEmail())) {
                return true;
            }
        }
        return false;
    }

    // 팀 명함지갑에 명함 등록 로직
    private String addCardToTeamAlbumDetail(TeamAlbumDetailRequest request) {
        teamAlbumDetailRepository.save(TeamAlbumDetail.builder()
                .teamAlbum(request.teamAlbum())
                .businesscard(request.businesscard())
                .memo(request.memo())
                .build());
        return "명함이 등록되었습니다.";
    }

    // 팀 명함지갑에 명함 수정
    @Override
    public void updateCard(Long teamAlbumId, Long cardId, CardRequest request) {
        TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                teamAlbumId, cardId);
        businesscardRepository.save(Businesscard.builder()
                .cardId(teamAlbumDetail.getBusinesscard().getCardId())
                .name(request.name())
                .company(request.company())
                .position(request.position())
                .rank(request.rank())
                .department(request.department())
                .email(request.email())
                .landlineNumber(request.landlineNumber())
                .faxNumber(request.faxNumber())
                .phoneNumber(request.phoneNumber())
                .address(request.address())
                .realPicture(request.realPicture())
                .frontBack(request.frontBack())
                .domainUrl(request.domainUrl())
                .build());
    }

    // 팀 명함지갑에서 명함 삭제
    @Override
    public void deleteCard(Long teamAlbumId, Long cardId) {
        TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                teamAlbumId, cardId
        );
        teamAlbumDetailRepository.delete(teamAlbumDetail);
    }

    // 팀 명함지갑 명함에 필터 추가
    @Override
    @Transactional
    public void addFilter(Long teamAlbumId, Long cardId, List<CardAddFilterRequest> requestList) {
        TeamAlbum teamAlbum = findTeam(teamAlbumId);
        List<Long> filterIdList = requestList.stream().map(CardAddFilterRequest::filterId).toList();

        for (Long filterId : filterIdList) {
            Filter filter = teamAlbumFilterRepository.findById(filterId)
                    .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                            GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_FILTER
                    ));
            TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                    teamAlbumId, cardId);
            teamAlbumMemberRepository.save(TeamAlbumMember.builder()
                    .filter(filter)
                    .teamAlbum(teamAlbum)
                    .teamAlbumDetail(teamAlbumDetail)
                    .build());
        }
    }

    private User findUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
        ));
        return user;
    }

    private TeamAlbum findTeam(Long teamId) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
        ));
        return teamAlbum;
    }
}

