package com.ssafy.businesscard.mycard.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.mycard.model.dto.request.MycardRegistRequest;
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


    @PostMapping("/{userId}")
    public ResponseEntity<MessageUtils> register(@PathVariable("userId") Long userId,
                                                 @RequestBody MycardRegistRequest registRequest) {
        mycardService.registerCard(userId, registRequest);
        log.info("[New Card] : {}", registRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

    @PostMapping("/{userId}/{cardId}")
    public ResponseEntity<MessageUtils> reRegister(@PathVariable("userId") Long userId,
                                                   @PathVariable("cardId") Long cardId,
                                                   @RequestBody MycardRegistRequest registRequest) {
        mycardService.registerCard(userId, registRequest);
        log.info("[ReRegister Card] : {}", registRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success("명함이 재등록되었습니다."));
    }
}
