package com.ssafy.businesscard.teams.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.privateAlbum.dto.FilterCardResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
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
        List<TeamListResponseDto> dtos = teamsService.getTeamList(userId);
        return ResponseEntity.ok().body(MessageUtils.success(dtos).getDataBody());
    }

    //팀 내 명함 조회
    @GetMapping("/teams/list/{team_album_id}/{page}")
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

    //팀 명함 상세 조회
    @GetMapping("/teams/{team_album_id}/{card_id}")
    public ResponseEntity<?> getTeamAlbumDtail(
            @PathVariable("team_album_id")Long teamAlbumId,
            @PathVariable("card_id")Long cardId){
        PrivateAlbumResponseDto dtos = teamsService.getTeamAlbumDtail(teamAlbumId, cardId);
        return ResponseEntity.ok().body(MessageUtils.success(dtos));
    }

    //엑셀로 내보내기용 팀 명함 목록조회
    @GetMapping("/teams/list/{team_album_id}")
    public ResponseEntity<?> getTeamAlbumAllList(@PathVariable("team_album_id")Long teamAlbumId){
        List<PrivateAlbumResponseDto> dtos = teamsService.getTeamAlbumAllList(teamAlbumId);
        return ResponseEntity.ok().body(MessageUtils.success(dtos));
    }

    //필터 목록 조회
    @GetMapping("/teams/{team_album_detail_id}/filter")
    public ResponseEntity<?> getFilter(@PathVariable("team_album_detail_id")Long teamsAlbumDetailId){
        List<FilterListResponseDto> dtos = teamsService.getFilter(teamsAlbumDetailId);
        return ResponseEntity.ok().body(MessageUtils.success(dtos));
    }

    //필터 별 명함 조회
    @GetMapping("/teams/{team_album_id}/filter/{filter_id}")
    public ResponseEntity<?> getFilterCard(
            @PathVariable("team_album_id")Long teamAlbumId,
            @PathVariable("filter_id")Long filterId){
        FilterCardResponseDto dto = teamsService.getFilterCard(teamAlbumId, filterId);
        return ResponseEntity.ok().body(MessageUtils.success(dto));
    }
    //상세보기에서 명함마다 필터 뭐있는지 조회
    @GetMapping("/teams/{team_album_id}/{card_id}/filter")
    public ResponseEntity<?> getCardFilter(
            @PathVariable("team_album_id")Long teamAlbumId,
            @PathVariable("card_id")Long cardId){
        List<FilterListResponseDto> dtos = teamsService.getAlbumDtailFilter(teamAlbumId, cardId);
        return ResponseEntity.ok().body(MessageUtils.success(dtos));
    }
}
