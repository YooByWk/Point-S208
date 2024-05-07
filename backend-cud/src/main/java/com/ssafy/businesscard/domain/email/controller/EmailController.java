package com.ssafy.businesscard.domain.email.controller;

import com.ssafy.businesscard.domain.email.dto.request.EmailsendRequest;
import com.ssafy.businesscard.domain.email.service.EmailService;
import com.ssafy.businesscard.domain.user.service.UserService;
import com.ssafy.businesscard.global.utils.MessageUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
@Validated
@CrossOrigin("*")
public class EmailController {
    private final EmailService emailService;
    private final UserService userService;

    @PostMapping("/{userId}/{card_id}/share/email")

    public ResponseEntity<MessageUtils> regist(@PathVariable("userId") Long userId,
                                               @PathVariable("card_id") Long card_id,
                                               @Valid @RequestBody EmailsendRequest emailsendRequest
    ) {

        emailService.sendEmail(emailsendRequest.recipientEmail(), card_id);

        return ResponseEntity.ok().body(MessageUtils.success("명함이 등록되었습니다."));
    }

}
