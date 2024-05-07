package com.ssafy.businesscard.domain.email.service;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.global.config.EmailConfig;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;

import java.util.Properties;

@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailConfig emailConfig;
    private final BusinesscardRepository businesscardRepository;

    //
//    @Transactional
//    public void sendCodeMail(String email){
//        //인증번호 생성
//        String number = certificationUtil.createNumber();
//        log.debug("인증번호 생성 = {}", number);
//        CertificationNumber certificationNumber = CertificationNumber
//                .builder()
//                .email(email)
//                .number(number)
//                .build();
//
//        //레디스에 저장
//        repository.save(certificationNumber);
//        //메일 생성 및 전송
//
//        try {
//            MimeMessage message = mailSender.createMimeMessage();
//            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
//            messageHelper.setFrom(emailConfig.getUserName());
//            messageHelper.setTo(email);
//            messageHelper.setSubject("[FLOWERING] 이메일 인증 번호입니다.");
//            messageHelper.setText(makeCodeTemplate(number),true);
//
//            mailSender.send(message);
//        } catch (MessagingException e) {
//            throw new RuntimeException("메일 생성 오류", e);
//        }
//    }
    public void sendEmail(String recipientEmail, Long cardId) {


        Businesscard businesscard = businesscardRepository.findById(cardId).
                orElseThrow(() -> new GlobalExceptionHandler.
                        UserException(GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_CARD));

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom(emailConfig.getUserName());
            messageHelper.setTo(recipientEmail);
            messageHelper.setSubject("명함 정보입니다.");
            messageHelper.setText(businesscard.toString(), true);
            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("메일 생성 오류", e);
        }

    }


}
