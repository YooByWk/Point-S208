package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.repository.TeamRepository;
import com.ssafy.businesscard.domain.team.service.TeamService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    // 팀 생성(건너뛰기)
    @Override
    public String create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
        ));
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
}
