package com.ssafy.businesscard.mycard.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.mycard.dto.request.MycardRegistRequest;
import com.ssafy.businesscard.mycard.service.MycardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-card")
public class MycardController {

    private final MycardService mycardService;

    // 내 명함 직접 입력으로 등록 및 재등록
    @PostMapping("/{userId}")
    public ResponseEntity<MessageUtils> register(@PathVariable("userId") Long userId,
                                                 @RequestBody MycardRegistRequest registRequest) {
        mycardService.registerCard(userId, registRequest);
        log.info("[Register Card] : {}", registRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    // 내 명함 정보 수정
    @PatchMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> update(@PathVariable("userId") Long userId,
                                               @PathVariable("cardId") Long cardId,
                                               @RequestBody MycardRegistRequest registRequest) {
        mycardService.update(userId, cardId, registRequest);
        log.info("[Update Card] : {}", registRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success("정보가 수정되었습니다."));
    }

    // 내 명함 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<MessageUtils> delete(@PathVariable("userId") Long userId) {
        mycardService.delete(userId);
        log.info("[Delete Card] : {}");
        return ResponseEntity.ok().body(MessageUtils.success("명함이 삭제되었습니다."));
    }
}
