package com.ssafy.businesscard.domain.team.controller;

import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.service.TeamService;
import com.ssafy.businesscard.global.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamService teamService;

    // 팀 명함지갑 생성
    @PostMapping("/{userId}/skip")
    public ResponseEntity<?> create(@PathVariable("userId") Long userId,
                                               @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        String result = teamService.create(userId, teamAlbumRegistRequest);
        log.info("[Create Team] : {}", teamAlbumRegistRequest);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑 이름 수정
    @PatchMapping("/{userId}/{teamId}")
    public ResponseEntity<?> update(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamId,
                                    @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        String result = teamService.update(userId, teamId, teamAlbumRegistRequest);
        log.info("[Update Team] : {}", teamAlbumRegistRequest);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑 삭제
    @DeleteMapping("/{userId}/{teamId}")
    public ResponseEntity<?> delete(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamId) {
        String result = teamService.delete(userId, teamId);
        log.info("[Delete Team] : {}", result);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑에 명함 등록
    @PostMapping("/{teamId}")
    public ResponseEntity<?> registCard(@PathVariable("teamId") Long teamAlbumId,
                                        @RequestBody CardRequest request) {
        String result = teamService.registCard(teamAlbumId, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

}
