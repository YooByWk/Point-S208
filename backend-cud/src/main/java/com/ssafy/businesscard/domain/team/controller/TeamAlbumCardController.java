package com.ssafy.businesscard.domain.team.controller;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.team.service.TeamAlbumCardService;
import com.ssafy.businesscard.global.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/teams")
public class TeamAlbumCardController {

    private final TeamAlbumCardService teamAlbumCardService;

    // 팀 명함지갑에 명함 등록
    @PostMapping("/{userId}/{teamId}/card")
    public ResponseEntity<?> regist(@PathVariable("userId") Long userId,
                                    @PathVariable("teamId") Long teamAlbumId,
                                    @RequestBody CardRequest request) {
        teamAlbumCardService.regist(userId, teamAlbumId, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    // 팀 명함지갑에 OCR로 명함 등록
    @PostMapping("/{userId}/{teamId}/ocr")
    public ResponseEntity<MessageUtils> registCard(@PathVariable("userId") Long userId,
                                                   @PathVariable("teamId") Long teamAlbumId,
                                                   @RequestPart("image") MultipartFile image,
                                                   @RequestPart("request") CardRequest request){
        teamAlbumCardService.registCard(userId, teamAlbumId, image, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    // 팀 명함지갑에 등록된 명함 수정
    @PatchMapping("/{userId}/{teamId}/card/{cardId}")
    public ResponseEntity<MessageUtils> updateCard(@PathVariable("userId") Long userId,
                                                   @PathVariable("teamId") Long teamAlbumId,
                                                   @PathVariable("cardId") Long cardId,
                                                   @RequestBody CardRequest request) {
        teamAlbumCardService.updateCard(userId, teamAlbumId, cardId, request);
        log.info("[Update Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 수정되었습니다."));
    }

    // 팀 명함지갑에 등록된 명함 삭제
    @DeleteMapping("/{userId}/{teamId}/card/{cardId}")
    public ResponseEntity<MessageUtils> deleteCard(@PathVariable("userId") Long userId,
                                                   @PathVariable("teamId") Long teamAlbumId,
                                                   @PathVariable("cardId") Long cardId) {
        teamAlbumCardService.deleteCard(userId, teamAlbumId, cardId);
        log.info("[Delete Card] : {}", cardId);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 삭제되었습니다."));
    }

    // 팀 명함지갑 명함에 필터 추가
    @PostMapping("/{userId}/{teamId}/{cardId}")
    public ResponseEntity<MessageUtils> addFilter(@PathVariable("userId") Long userId,
                                                  @PathVariable("teamId") Long teamAlbumId,
                                                  @PathVariable("cardId") Long cardId,
                                                  @RequestBody List<CardAddFilterRequest> requestList) {
        teamAlbumCardService.addFilter(userId, teamAlbumId, cardId, requestList);
        log.info("[Add Filter] : {}", requestList);
        return ResponseEntity.ok().body(MessageUtils.success("명함에 필터가 추가되었습니다."));
    }

    // 팀 명함지갑 명함에 메모 등록 및 수정
    @PostMapping("/{userId}/{teamId}/{cardId}/memo")
    public ResponseEntity<MessageUtils> cardMemo(@PathVariable("userId") Long userId,
                                                 @PathVariable("teamId") Long teamAlbumId,
                                                 @PathVariable("cardId") Long cardId,
                                                 @RequestBody MemoRequest request) {
        String result = teamAlbumCardService.cardMemo(userId, teamAlbumId, cardId, request);
        log.info("[Card Memo] : {}", request.memo());
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 팀 내 명함에 추가된 필터 제거
    @DeleteMapping("/{userId}/{teamId}/{cardId}/filter/{filterId}")
    public ResponseEntity<MessageUtils> deleteFilter(@PathVariable("userId") Long userId,
                                                     @PathVariable("teamId") Long teamAlbumId,
                                                     @PathVariable("cardId") Long cardId,
                                                     @PathVariable("filterId") Long filterId) {
        teamAlbumCardService.deleteFilter(userId, teamAlbumId, cardId, filterId);
        log.info("[Delete Filter] : {}", filterId);
        return ResponseEntity.ok().body(MessageUtils.success("명함에서 필터가 제거되었습니다."));
    }
}
