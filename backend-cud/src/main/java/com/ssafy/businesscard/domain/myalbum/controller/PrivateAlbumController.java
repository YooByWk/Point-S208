package com.ssafy.businesscard.domain.myalbum.controller;


import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardSharedRequest;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumService;
import com.ssafy.businesscard.global.utils.MessageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-album")
@CrossOrigin("*")
public class PrivateAlbumController {

    private final PrivateAlbumService privateAlbumService;

    // 명함 추가
    @PostMapping("/{userId}")
    public ResponseEntity<?> regist(@PathVariable("userId") Long userId,
                                    @RequestBody CardRequest request) {
        privateAlbumService.regist(userId, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    // OCR로 명함 추가
    @PostMapping("/{userId}/ocr")
    public ResponseEntity<MessageUtils> registCard(@PathVariable("userId") Long userId,
                                                   @RequestPart("image") MultipartFile image,
                                                   @RequestPart("request") CardRequest request) {
        privateAlbumService.registCard(userId, image, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

   // 팀 명함지갑에 있는 명함 명함지갑에 저장
    @PostMapping("/{userId}/save")
    public ResponseEntity<MessageUtils> registSharedCard(@PathVariable("userId") Long userId,
                                                         @RequestBody CardSharedRequest cardSharedRequest) {
        privateAlbumService.registSharedCard(userId, cardSharedRequest);
        return ResponseEntity.ok().body(MessageUtils.success("나의 명함지갑에 등록되었습니다"));
    }

    // 명함지갑에 있는 명함 팀 명함지갑으로 공유
    @PostMapping("/{userId}/{teamId}/share")
    public ResponseEntity<MessageUtils> shareCard(@PathVariable("userId") Long userId,
                                                  @PathVariable("teamId") Long teamId,
                                                  @RequestBody CardSharedRequest request) {
        privateAlbumService.shareCard(userId, teamId, request);
        log.info("[Share Card] : {}", request.cardIds());
        return ResponseEntity.ok().body(MessageUtils.success("팀 명함지갑에 공유되었습니다."));
    }

    // 명함에 필터 추가
    @PostMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> addFilter(@PathVariable("userId") Long userId,
                                                  @PathVariable("cardId") Long cardId,
                                                  @RequestBody List<CardAddFilterRequest> request) {
        privateAlbumService.addFilter(userId, cardId, request);
        log.info("[Add Filter] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함에 필터가 추가 되었습니다."));
    }

    // 명함지갑 명함 상세 수정
    @PatchMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> cardUpdate(@PathVariable("userId") Long userId,
                                                   @PathVariable("cardId") Long cardId,
                                                   @RequestBody CardRequest request) {
        privateAlbumService.updateCard(userId, cardId, request);
        log.info("[Update Card] : {} 명함이 수정되었습니다.", request);
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
        log.info("[Delete Card] : {} 명함이 명함지갑에서 삭제되었습니다.", cardId);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 삭제되었습니다."));
    }

    // 명함에 등록된 필터 삭제
    @DeleteMapping("/{userId}/{cardId}/filter/{filterId}")
    public ResponseEntity<MessageUtils> deleteFilter(@PathVariable("userId") Long userId,
                                                     @PathVariable("cardId") Long cardId,
                                                     @PathVariable("filterId") Long filterId) {
        privateAlbumService.deleteFilter(userId, cardId, filterId);
        log.info("[Delete Filter] : {}", filterId);
        return ResponseEntity.ok().body(MessageUtils.success("명함에서 필터가 제거되었습니다."));
    }
}
