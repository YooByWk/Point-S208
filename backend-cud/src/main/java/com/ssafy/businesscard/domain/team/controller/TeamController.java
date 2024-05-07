package com.ssafy.businesscard.domain.team.controller;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.service.TeamAlbumService;
import com.ssafy.businesscard.global.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/teams")
public class TeamController {

    private final TeamAlbumService teamAlbumService;

    // 팀 명함지갑 생성
    @PostMapping("/{userId}/skip")
    public ResponseEntity<?> create(@PathVariable("userId") Long userId,
                                               @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        String result = teamAlbumService.create(userId, teamAlbumRegistRequest);
        log.info("[Create Team] : {}", teamAlbumRegistRequest);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑 이름 수정
    @PatchMapping("/{userId}/{teamId}")
    public ResponseEntity<?> update(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamId,
                                    @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        String result = teamAlbumService.update(userId, teamId, teamAlbumRegistRequest);
        log.info("[Update Team] : {}", teamAlbumRegistRequest);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑 삭제
    @DeleteMapping("/{userId}/{teamId}")
    public ResponseEntity<?> delete(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamId) {
        String result = teamAlbumService.delete(userId, teamId);
        log.info("[Delete Team] : {}", result);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑에 명함 등록
    @PostMapping("/{teamId}")
    public ResponseEntity<?> registCard(@PathVariable("teamId") Long teamAlbumId,
                                        @RequestBody CardRequest request) {
        String result = teamAlbumService.registCard(teamAlbumId, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 명함지갑에 등록된 명함 수정
    @PatchMapping("/{teamId}/card/{cardId}")
    public ResponseEntity<MessageUtils> updateCard(@PathVariable("teamId") Long teamAlbumId,
                                        @PathVariable("cardId") Long cardId,
                                        @RequestBody CardRequest request) {
        teamAlbumService.updateCard(teamAlbumId, cardId, request);
        log.info("[Update Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 수정되었습니다."));
    }

    // 팀 명함지갑에 등록된 명함 삭제
    @DeleteMapping("/{teamId}/card/{cardId}")
    public ResponseEntity<MessageUtils> deleteCard(@PathVariable("teamId") Long teamAlbumId,
                                                   @PathVariable("cardId") Long cardId) {
        teamAlbumService.deleteCard(teamAlbumId, cardId);
        log.info("[Delete Card] : {}", cardId);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 삭제되었습니다."));
    }

    // 팀 명함지갑 명함에 필터 추가
    @PostMapping("/{teamId}/{cardId}")
    public ResponseEntity<MessageUtils> addFilter(@PathVariable("teamId") Long teamAlbumId,
                                                  @PathVariable("cardId") Long cardId,
                                                  @RequestBody List<CardAddFilterRequest> requestList) {
        teamAlbumService.addFilter(teamAlbumId, cardId, requestList);
        log.info("[Add Filter] : {}", requestList);
        return ResponseEntity.ok().body(MessageUtils.success("명함에 필터가 추가되었습니다."));
    }
}
