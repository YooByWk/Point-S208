package com.ssafy.businesscard.domain.myalbum.controller;


import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumService;
import com.ssafy.businesscard.global.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-album")
public class PrivateAlbumController {

    private final PrivateAlbumService privateAlbumService;

    // 명함 추가
    @PostMapping("/{userId}")
    public ResponseEntity<?> registCard(@PathVariable("userId") Long userId,
                                                   @RequestBody CardRequest request) {
        String result = privateAlbumService.registCard(userId, request);
        log.info("Regist Card : {}" , request);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 명함에 필터 추가
    @PostMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> addFilter(@PathVariable("userId") Long userId,
                                                  @PathVariable("cardId") Long cardId,
                                                  @RequestBody List<CardAddFilterRequest> request) {
        privateAlbumService.addFilter(userId, cardId, request);
        log.info("Add Filter : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함에 필터가 추가 되었습니다."));
    }

    // 명함지갑 명함 상세 수정
    @PatchMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> cardUpdate(@PathVariable("userId") Long userId,
                                                   @PathVariable("cardId") Long cardId,
                                                   @RequestBody CardRequest request){
        privateAlbumService.updateCard(userId, cardId, request);
        log.info("Update Card : {} 명함이 수정되었습니다.", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 수정되었습니다."));
    }

    // 명함에 메모 등록 및 수정
    @PostMapping("/{userId}/{cardId}/memo")
    public ResponseEntity<MessageUtils> cardMemo(@PathVariable("userId") Long userId,
                                                 @PathVariable("cardId") Long cardId,
                                                 @RequestBody MemoRequest request) {
        String result = privateAlbumService.cardMemo(userId, cardId, request);
        log.info("[Card Memo] : {}", request.memo());
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    // 명함지갑에서 명함 삭제
    @DeleteMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> deleteCard(@PathVariable("userId") Long userId,
                                                   @PathVariable("cardId") Long cardId) {
        privateAlbumService.deleteCard(userId, cardId);
        log.info("Delete Card : {} 명함이 명함지갑에서 삭제되었습니다.", cardId);
        return ResponseEntity.ok().body(MessageUtils.success("명함지갑에서 명함이 삭제되었습니다."));
    }
}
