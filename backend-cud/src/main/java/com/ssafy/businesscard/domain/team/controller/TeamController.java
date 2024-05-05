package com.ssafy.businesscard.domain.team.controller;

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
        log.info("[Create Team] : {}", teamAlbumRegistRequest);
        return ResponseEntity.ok().body(teamService.create(userId, teamAlbumRegistRequest));
    }
    
}
