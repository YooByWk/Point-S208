package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
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

    // 팀 명함지갑 생성(건너뛰기)
    @Override
    public String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);
        TeamAlbum teamAlbum = teamRepository.findByUser_userIdAndTeamName(userId, teamAlbumRegistRequest.teamName());
        if (teamAlbum == null) {
            teamRepository.save(TeamAlbum.builder()
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());
            return "팀이 생성되었습니다.";
        } else {
            return "이미 존재하는 팀입니다.";
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

