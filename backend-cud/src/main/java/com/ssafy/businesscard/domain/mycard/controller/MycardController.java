package com.ssafy.businesscard.domain.mycard.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.domain.mycard.dto.request.MycardRegistRequest;
import com.ssafy.businesscard.domain.mycard.service.MycardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/my-card")
public class MycardController {

    private final MycardService mycardService;

    // 내 명함 등록 및 재등록
    @PostMapping("/{userId}")
    public ResponseEntity<MessageUtils> regist(@PathVariable("userId") Long userId,
                                                 @RequestBody MycardRegistRequest registRequest) {
        log.info("[Regist Card] : {}", registRequest.toString());
        mycardService.regist(userId, registRequest);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    // 내 명함 등록 OCR
    @PostMapping("/{userId}/ocr")
    public ResponseEntity<MessageUtils> registCard(@PathVariable("userId") Long userId,
                                                   @RequestPart MultipartFile image,
                                                   @RequestPart MycardRegistRequest request) {
        mycardService.registCard(userId, image, request);
        log.info("[Regist Card] : {}", request);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    // 내 명함 정보 수정
    @PatchMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> update(@PathVariable("userId") Long userId,
                                               @PathVariable("cardId") Long cardId,
                                               @RequestBody MycardRegistRequest registRequest) {
        log.info("[Update Card] : {}", registRequest.toString());
        mycardService.update(userId, cardId, registRequest);
        return ResponseEntity.ok().body(MessageUtils.success("정보가 수정되었습니다."));
    }

    // 내 명함 삭제
    @DeleteMapping("/{userId}")
    public ResponseEntity<MessageUtils> delete(@PathVariable("userId") Long userId) {
        log.info("[Delete Card] : {}");
        mycardService.delete(userId);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 삭제되었습니다."));
    }

}
