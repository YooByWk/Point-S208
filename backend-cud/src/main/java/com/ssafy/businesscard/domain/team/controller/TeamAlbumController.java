package com.ssafy.businesscard.domain.team.controller;

import com.ssafy.businesscard.domain.team.dto.request.MemberRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.service.TeamAlbumService;
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
public class TeamAlbumController {

    private final TeamAlbumService teamAlbumService;

    // 팀 명함지갑 생성(구성원추가 스킵)
    @PostMapping("/{userId}/skip")
    public ResponseEntity<?> create(@PathVariable("userId") Long userId,
                                    @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        teamAlbumService.create(userId, teamAlbumRegistRequest);
        log.info("[Create Team] : {}", teamAlbumRegistRequest.teamName());
        return ResponseEntity.ok().body(MessageUtils.success("팀이 생성되었습니다."));
    }

    // 팀 명함지갑 생성
    @PostMapping("/{userId}/create")
    public ResponseEntity<?> createTeamAlbum(@PathVariable("userId") Long userId,
                                             @RequestBody TeamAlbumRegistRequest teamAlbumRequest) {
        teamAlbumService.createTeamAlbum(userId, teamAlbumRequest);
        log.info("[Create Team] : {}", teamAlbumRequest.teamName());
        return ResponseEntity.ok().body(MessageUtils.success("팀이 생성되었습니다."));
    }

    // 팀 명함지갑 이름 수정
    @PatchMapping("/{userId}/{teamId}")
    public ResponseEntity<?> update(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamId,
                                    @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        teamAlbumService.update(userId, teamId, teamAlbumRegistRequest);
        log.info("[Update Team] : {}", teamAlbumRegistRequest);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 수정되었습니다."));
    }

    // 팀 명함지갑 삭제
    @DeleteMapping("/{userId}/{teamId}")
    public ResponseEntity<?> delete(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamId) {
        teamAlbumService.delete(userId, teamId);
        log.info("[Delete Team] : {}", teamId);
        return ResponseEntity.ok().body(MessageUtils.success("명함지갑이 삭제되었습니다."));
    }

    // 팀 명함지갑에 구성원 추가
    @PostMapping("/{userId}/{teamId}/member")
    public ResponseEntity<MessageUtils> addMember(@PathVariable("userId") Long userId,
                                                  @PathVariable("teamId") Long teamAlbumId,
                                                  @RequestBody MemberRequest request) {
        teamAlbumService.addMember(userId, teamAlbumId, request);
        log.info("[Add Member] : {}", request.userList());
        return ResponseEntity.ok().body(MessageUtils.success("구성원이 추가되었습니다."));
    }

    // 팀 명함지갑 구성원 삭제
    @DeleteMapping("/{userId}/{teamId}/member/{memberId}")
    public ResponseEntity<MessageUtils> deleteMember(@PathVariable("userId") Long userId,
                                                     @PathVariable("teamId") Long teamAlbumId,
                                                     @PathVariable("memberId") Long memberId) {
        teamAlbumService.deleteMember(userId, teamAlbumId, memberId);
        log.info("[Delete Member] : {}",memberId);
        return ResponseEntity.ok().body(MessageUtils.success("구성원을 방출했습니다."));
    }
}
