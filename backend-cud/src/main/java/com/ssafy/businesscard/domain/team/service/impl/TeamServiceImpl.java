package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumDetailRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamMemberRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import com.ssafy.businesscard.domain.team.entity.TeamMember;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumDetailRepository;
import com.ssafy.businesscard.domain.team.repository.TeamMemberRepository;
import com.ssafy.businesscard.domain.team.repository.TeamRepository;
import com.ssafy.businesscard.domain.team.service.TeamService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;
    private final TeamMemberRepository teamMemberRepository;

    // 팀 명함지갑 생성(건너뛰기)
    @Override
    @Transactional
    public String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);
        TeamAlbum checkTeamAlbum = teamRepository.findByUser_userIdAndTeamName(userId, teamAlbumRegistRequest.teamName());
        if (checkTeamAlbum == null) {
            TeamAlbum teamAlbum = teamRepository.save(TeamAlbum.builder()
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());
            TeamAlbumDetailRequest teamAlbumDetailRequest = TeamAlbumDetailRequest.builder()
                    .teamAlbum(teamAlbum)
                    .businesscard(null)
                    .build();
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .user(user)
                    .teamAlbum(teamAlbum)
                    .build();
            String resultDetail = addTeamAlbumDetail(teamAlbumDetailRequest);
            String resultMember = addTeamMember(teamMemberRequest);
            return verification(resultDetail, resultMember);

        } else {
            return "이미 존재하는 팀입니다.";
        }
    }


    // 팀 명함지갑 생성시 그룹상세에 등록
    private String addTeamAlbumDetail(TeamAlbumDetailRequest teamAlbumDetailRequest) {
        teamAlbumDetailRepository.save(TeamAlbumDetail.builder()
                .teamAlbum(teamAlbumDetailRequest.teamAlbum())
                .businesscard(teamAlbumDetailRequest.businesscard())
                .build());
        return "okay";
    }

    // 팀 명함지갑 생성시 팀 구성원에 등록
    private String addTeamMember(TeamMemberRequest teamMemberRequest) {
        teamMemberRepository.save(TeamMember.builder()
                .user(teamMemberRequest.user())
                .teamAlbum(teamMemberRequest.teamAlbum())
                .build());
        return "okay";
    }

    private String verification(String resultDetail, String resultMember) {
        if (resultDetail.equals("okay") && resultMember.equals("okay")) {
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
            teamRepository.save(TeamAlbum.builder()
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
            teamRepository.delete(teamAlbum);
            return "팀 명함지갑이 삭제되었습니다.";
        } else {
            return "Owner가 아닙니다.";
        }
    }


    private User findUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
        ));
        return user;
    }

    private TeamAlbum findTeam(Long teamId) {
        TeamAlbum teamAlbum = teamRepository.findById(teamId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
        ));
        return teamAlbum;
    }
}

