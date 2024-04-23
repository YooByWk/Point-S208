package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.VerifyEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerifyEmailServiceImpl implements VerifyEmailService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender emailSender;

    public void sendMail(String to, String title, String tmpPassword) {
        SimpleMailMessage message = messageSetting(to, title, tmpPassword);
        emailSender.send(message);
    }

    private static SimpleMailMessage messageSetting(String to, String sub, String tmpPassword) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(sub);
        String content = "안녕하세요,\n" +
                "\n" +
                "회원님의 계정 안전을 위해 비밀번호를 변경해주시기 바랍니다. \n" +
                "\n임시비밀번호 : " +
                tmpPassword +
                "\n" +
                "비밀번호를 안전하게 보호하기 위해 다음 사항을 고려해주세요:\n" +
                "\n" +
                "영문 대/소문자, 숫자, 특수문자를 혼합하여 비밀번호를 설정하세요.\n" +
                "다른 사이트의 비밀번호와 겹치지 않도록 주의하세요.\n" +
                "주기적으로 비밀번호를 변경하여 계정을 보호하세요.\n" +
                "변경 사항이 없거나 궁금한 사항이 있으시면 언제든지 저희에게 문의해주세요.\n" +
                "\n" +
                "감사합니다.\n" +
                "\n" +
                "동글이";
        message.setText(content);
        return message;
    }

    @Transactional
    public void sendVerificationMail(String email) {
        UUID uuid = UUID.randomUUID();
        String password = uuid.toString().substring(0, 10);
        //인증 링크 전송
        sendMail(email, "비밀번호 재설정 메일입니다.", password);
        setTmpPassword(email, password);
    }

    private void setTmpPassword(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow();
        user.updatePassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}
