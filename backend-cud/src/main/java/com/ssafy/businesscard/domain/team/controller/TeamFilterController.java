package com.ssafy.businesscard.domain.team.controller;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.team.service.TeamFilterService;
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
public class TeamFilterController {

    private final TeamFilterService teamFilterService;

    // 필터 생성
    @PostMapping("/{teamId}/filter")
    public ResponseEntity<MessageUtils> create(@PathVariable("teamId") Long teamAlbumId,
                                               @RequestBody FilterRequest request) {
        teamFilterService.create(teamAlbumId, request);
        log.info("[Create Filter] : {}", request.filterName());
        return ResponseEntity.ok().body(MessageUtils.success("필터가 생성되었습니다."));
    }
}
