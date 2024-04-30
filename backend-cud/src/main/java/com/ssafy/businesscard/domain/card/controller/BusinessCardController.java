package com.ssafy.businesscard.domain.card.controller;

import com.ssafy.businesscard.domain.card.service.BusinessCardService;
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
@RequestMapping("/api/cards")
public class BusinessCardController {

    private final BusinessCardService businessCardService;

    @PostMapping("/{userId}")
    public ResponseEntity<MessageUtils> register(@PathVariable("userId") Long userId,
                                                 @RequestPart(value = "cardImages") List<MultipartFile> cardImages) {

        businessCardService.register(userId, cardImages);
        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }
}
