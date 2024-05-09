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

    // 명함공유
    @PostMapping("/{card_id}/share/email")

    public ResponseEntity<MessageUtils> sharerealpicture(
            @PathVariable("card_id") Long card_id,
            @Valid @RequestBody EmailsendRequest emailsendRequest
    ) {

        emailService.sendEmail(emailsendRequest.recipientEmail(), card_id );

        return ResponseEntity.ok().body(MessageUtils.success("명함이 전송되었습니다."));
    }

    // 나 자신의 디지털 명함 공유
    @PostMapping("/{user_id}/share/email/digital")
    public ResponseEntity<MessageUtils> sharedigital(
            @PathVariable("user_id") Long user_id,
            @Valid @RequestBody EmailsendRequest emailsendRequest
    ) {
        emailService.sendEmailDigital(emailsendRequest.recipientEmail(), user_id );
        return ResponseEntity.ok().body(MessageUtils.success("명함이 전송되었습니다."));
    }


}
