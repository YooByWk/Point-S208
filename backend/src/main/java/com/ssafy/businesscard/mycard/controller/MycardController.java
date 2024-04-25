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


    @PostMapping("/{userId}")
    public ResponseEntity<MessageUtils> register(@PathVariable("userId") Long userId,
                                                 @RequestBody MycardRegistRequest registRequest) {
        mycardService.registerCard(userId, registRequest);
        log.info("[New Card] : {}", registRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

}
