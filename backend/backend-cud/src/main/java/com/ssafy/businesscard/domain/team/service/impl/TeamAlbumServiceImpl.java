package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.team.dto.request.MemberRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamMemberRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamMember;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumRepository;
import com.ssafy.businesscard.domain.team.repository.TeamMemberRepository;
import com.ssafy.businesscard.domain.team.service.TeamAlbumService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamAlbumServiceImpl implements TeamAlbumService {

    private final UserRepository userRepository;
    private final TeamAlbumRepository teamAlbumRepository;
    private final TeamMemberRepository teamMemberRepository;

    // 팀 명함지갑 생성(건너뛰기)
    @Override
    @Transactional
    public void create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
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
            addTeamMember(teamMemberRequest);
        } else {
            throw new UserException(UserErrorCode.ALREADY_IN_TEAM);
        }
    }

    // 팀 명함지갑 생성(구성원추가)
    @Override
    public void createTeamAlbum(Long userId, TeamAlbumRegistRequest teamAlbumRequest) {
        User user = findUser(userId);
        TeamAlbum checkTeamAlbum = teamAlbumRepository.findByUser_userIdAndTeamName(userId, teamAlbumRequest.teamName());
        if (checkTeamAlbum == null) {
            TeamAlbum teamAlbum = teamAlbumRepository.save(TeamAlbum.builder()
                    .teamName(teamAlbumRequest.teamName())
                    .user(user)
                    .build());
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .user(user)
                    .teamAlbum(teamAlbum)
                    .build();
            addTeamMember(teamMemberRequest);
            if (teamAlbumRequest.userList() != null) {
                addMemberList(teamAlbum, teamAlbumRequest.userList());
            }
        } else {
            throw new UserException(UserErrorCode.ALREADY_IN_TEAM);
        }
    }

    private void addMemberList(TeamAlbum teamAlbum, List<Long> userIdList){
        List<User> userList = new ArrayList<>();
        for (Long userInfo : userIdList) {
            User user = userRepository.findById(userInfo).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
            userList.add(user);
        }
        for (User user : userList) {
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .teamAlbum(teamAlbum)
                    .user(user)
                    .build();
            addTeamMember(teamMemberRequest);
        }
    }

    // 팀 명함지갑 생성시 팀 구성원에 등록
    private void addTeamMember(TeamMemberRequest teamMemberRequest) {
        TeamMember teamMember = teamMemberRepository.findByTeamAlbum_TeamAlbumIdAndUser_UserId(
                teamMemberRequest.teamAlbum().getTeamAlbumId(), teamMemberRequest.user().getUserId()
        );
        if (teamMember == null) {
            teamMemberRepository.save(TeamMember.builder()
                    .user(teamMemberRequest.user())
                    .teamAlbum(teamMemberRequest.teamAlbum())
                    .build());
        } else {
            throw new UserException(UserErrorCode.ALREADY_IN_TEAMMEMBER);
        }
    }

    // 팀 명함지갑 이름 수정
    @Override
    @Transactional
    public void update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);
        TeamAlbum teamAlbum = findTeam(teamId);
        if (teamAlbum.getUser().equals(user)) {
            teamAlbumRepository.save(TeamAlbum.builder()
                    .teamAlbumId(teamAlbum.getTeamAlbumId())
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());

        } else {
            throw new UserException(UserErrorCode.NOT_TEAM_OWNER);
        }
    }

    // 팀 명함지갑 삭제
    @Override
    @Transactional
    public void delete(Long userId, Long teamId) {
        User user = findUser(userId);
        TeamAlbum teamAlbum = findTeam(teamId);
        if (teamAlbum.getUser().equals(user)) {
            teamAlbumRepository.delete(teamAlbum);
        } else {
            throw new UserException(UserErrorCode.NOT_TEAM_OWNER);
        }
    }

    // 팀 명함지갑에 구성원 추가
    @Override
    public void addMember(Long userId, Long teamAlbumId, MemberRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
        addMemberList(teamAlbum, request.userList());
    }

    // 팀 명함지갑 구성원 삭제
    @Override
    public void deleteMember(Long userId, Long teamAlbumId, Long memberId) {
        TeamMember teamMember = teamMemberRepository.findByTeamAlbum_TeamAlbumIdAndUser_UserId(teamAlbumId, memberId);
        teamMemberRepository.delete(teamMember);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
    }

    private TeamAlbum findTeam(Long teamId) {
        return teamAlbumRepository.findById(teamId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
    }
}

