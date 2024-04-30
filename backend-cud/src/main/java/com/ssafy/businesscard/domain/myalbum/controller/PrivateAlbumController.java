package com.ssafy.businesscard.domain.myalbum.controller;


import com.ssafy.businesscard.domain.myalbum.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.UpdateCardRequest;
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
                                                   @RequestBody UpdateCardRequest request){
        privateAlbumService.updateCard(userId, cardId, request);
        log.info("Update Card : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 수정되었습니다."));
    }
}
