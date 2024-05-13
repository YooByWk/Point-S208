package com.ssafy.businesscard.domain.email.service;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.config.EmailConfig;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.UrlResource;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Properties;

@RequiredArgsConstructor
@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final EmailConfig emailConfig;
    private final BusinesscardRepository businesscardRepository;
    private final UserRepository userRepository;

    public void sendEmail(String recipientEmail, Long cardId) {

        Businesscard businesscard = businesscardRepository.findById(cardId).
                orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_CARD));

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);

            messageHelper.setFrom(new InternetAddress(emailConfig.getUserName(), "SSAFYS208@ssafys208.onmicrosoft.com"));

            messageHelper.setTo(recipientEmail);
            messageHelper.setSubject("명함 정보입니다.");
            messageHelper.setText(toEmailString(businesscard), true);


            System.out.println("rrrrrrrr" + businesscard.getRealPicture());

            if (businesscard.getRealPicture() != null && !businesscard.getRealPicture().isEmpty()) {

                URL imageUrl = new URL(businesscard.getRealPicture());
                File tempFile = File.createTempFile("temp", ".jpg");

                try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                    fos.write(imageUrl.openStream().readAllBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                messageHelper.addAttachment("image.jpg", tempFile);
            }

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("메일 생성 오류", e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public void sendEmailDigital(String recipientEmail, Long user_id) {

        List<Businesscard> businesscards = businesscardRepository.findAllByUser_userId(user_id);
        if (businesscards.size() == 0) {
            throw new UserException(UserErrorCode.NOT_EXISTS_CARD);
        }

        log.info("businesscards" + businesscards);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setFrom(new InternetAddress(emailConfig.getUserName(), "SSAFYS208@ssafys208.onmicrosoft.com"));

            messageHelper.setTo(recipientEmail);
            messageHelper.setSubject("digital 명함 정보입니다.");

            messageHelper.setText(toEmailString(businesscards.get(0)), true);

            if (businesscards.size() == 2 && businesscards.get(1).getDigitalPicture() != null && !businesscards.get(1).getDigitalPicture().isEmpty()) {

                URL backimageUrl = new URL(businesscards.get(1).getDigitalPicture());
                File BacktempFile = File.createTempFile("temp2", ".jpg");

                try (FileOutputStream fos = new FileOutputStream(BacktempFile)) {
                    fos.write(backimageUrl.openStream().readAllBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                messageHelper.addAttachment("image.jpg", BacktempFile);

            }

            if (businesscards.get(0).getDigitalPicture() != null && !businesscards.get(0).getDigitalPicture().isEmpty()) {

                URL imageUrl = new URL(businesscards.get(0).getDigitalPicture());

                File FronttempFile = File.createTempFile("temp", ".jpg");


                try (FileOutputStream fos = new FileOutputStream(FronttempFile)) {
                    fos.write(imageUrl.openStream().readAllBytes());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }


                messageHelper.addAttachment("image.jpg", FronttempFile);
            }

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("메일 생성 오류", e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public String toEmailString(Businesscard businesscard) {
        StringBuilder sb = new StringBuilder();
        appendIfNotEmpty(sb, "이름: ", businesscard.getName());
        appendIfNotEmpty(sb, "회사: ", businesscard.getCompany());
        appendIfNotEmpty(sb, "직책: ", businesscard.getPosition());
        appendIfNotEmpty(sb, "직급: ", businesscard.getRank());
        appendIfNotEmpty(sb, "부서: ", businesscard.getDepartment());
        appendIfNotEmpty(sb, "이메일: ", businesscard.getEmail());
        appendIfNotEmpty(sb, "유선 전화번호: ", businesscard.getLandlineNumber());
        appendIfNotEmpty(sb, "팩스 번호: ", businesscard.getFaxNumber());
        appendIfNotEmpty(sb, "휴대폰 번호: ", businesscard.getPhoneNumber());
        appendIfNotEmpty(sb, "주소: ", businesscard.getAddress());
        appendIfNotEmpty(sb, "실제 사진: ", businesscard.getRealPicture());
//        sb.append("앞/뒤: ").append(businesscard.getFrontBack()).append("<br>");
        appendIfNotEmpty(sb, "도메인 URL: ", businesscard.getDomainUrl());
        return sb.toString();
    }

    private void appendIfNotEmpty(StringBuilder sb, String label, String value) {
        if (value != null && !value.isEmpty()) {
            sb.append(label).append(value).append("<br>");
        }
    }


}
