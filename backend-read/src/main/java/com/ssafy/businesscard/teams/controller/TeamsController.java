package com.ssafy.businesscard.teams.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.teams.dto.TeamListResponseDto;
import com.ssafy.businesscard.teams.dto.TeamMemberListResponseDto;
import com.ssafy.businesscard.teams.service.TeamsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TeamsController {

    private final TeamsService teamsService;
    
    //팀 리스트 조회
    @GetMapping("/teams/{user_id}")
    public ResponseEntity<?> getTeamList(@PathVariable("user_id")Long userId){
        List<TeamListResponseDto> list = teamsService.getTeamList(userId);
        return ResponseEntity.ok().body(MessageUtils.success(list).getDataBody());
    }

    //팀 내 명함 조회
    @GetMapping("/teams/{team_album_id}/{page}")
    public ResponseEntity<?> getTeamAlbumList(@PathVariable("team_album_id")Long teamAlbumId, @PathVariable("page")int page){
        List<PrivateAlbumResponseDto> dtos = teamsService.getTeamAlbumList(teamAlbumId, page);
        return ResponseEntity.ok().body(MessageUtils.success(dtos));
    }

    //팀의 팀원 조회
    @GetMapping("/teams/{user_id}/member/{team_album_id}")
    public ResponseEntity<?> getTeamMemberList(@PathVariable("user_id")Long userId, @PathVariable("team_album_id")Long teamAlbumId){
        List<TeamMemberListResponseDto> dtos = teamsService.getTeamMemberList(userId, teamAlbumId);
        return ResponseEntity.ok().body(MessageUtils.success(dtos));
    }
}
