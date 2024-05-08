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
        log.info("Regist Card : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success(result));
    }

    //    /api/{user_id}/{card_id}/share/email
    @PostMapping("/{userId}/save")
    public ResponseEntity<MessageUtils> registSharedCard(@PathVariable("userId") Long userId,
                                                         @RequestBody CardSharedRequest cardSharedRequest) {
// 팀명함 에 공유 -> 명함 아이디 안다 -> 명함 아이디로 명함정보 추출 -> 정보를 내 private-album 테이블에 추출한 정보 저장 ->
//        추출한 정보로 저장햇으므로, 팀명함에서 해당 명함 삭제해도 내 명함지갑에는 유지된다.

// 1 . 채팅 을 통한 공유된 명함을 내명함지갑에 저장.
// 2 팀 명함에 공유된 명함을 내명함지갑 에 저장 .

        privateAlbumService.registSharedCard(userId, cardSharedRequest);
//        log.info("Regist Card : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("나의 명함지갑에 등록되었습니다"));
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
                                                   @RequestBody CardRequest request) {
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
        return ResponseEntity.ok().body(MessageUtils.success("명함이 삭제되었습니다."));
    }
}
