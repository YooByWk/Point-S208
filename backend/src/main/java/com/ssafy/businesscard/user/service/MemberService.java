package com.ssafy.businesscard.user.service;

import com.ssafy.businesscard.user.exception.UserErrorCode;
import com.ssafy.businesscard.user.exception.UserException;
import com.ssafy.businesscard.user.model.dto.request.UserRegisterRequest;
import com.ssafy.businesscard.user.model.dto.response.UserResponse;
import com.ssafy.businesscard.user.model.entity.Member;
import com.ssafy.businesscard.user.model.entity.MemberProfile;
import com.ssafy.businesscard.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    String defaultThunmail = "https://businesscard-s3-v2.s3.ap-northeast-2.amazonaws.com/default_thumnail.svg";


    public void registUser(UserRegisterRequest request) {
        // 등록하려는 유저정보가 이미 DB에 있으면 예외처리
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new UserException(UserErrorCode.ALREADY_IN_EMAIL);
        });

        // 유저 객체를 DB에 저장
        userRepository.save(Member.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nickname(request.getNickname())
                .provider(request.getAuthProvider())
                .name(request.getName())
                .build());
    }


    public void registOauthUser(MemberProfile customUser) {
        try {
            userRepository.save(customUser.toMember());
        } catch (RuntimeException e) {
            throw new RuntimeException("오류 발생 : " + e);
        }
        log.info("유저 회원가입 성공 : {}", customUser.toString());

    }

    public UserResponse getUserInfo() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = (String) principal;

        Member customUser = userRepository.findByEmail(email).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        return customUser.toUserResponse(customUser);
    }

    public Member getNowUserInfoEntityByToken() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = (String) principal;

        Member customUser = userRepository.findByEmail(email).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        return customUser;
    }


//
//    public UserResponse getUserInfobyid(Long userid) {
//
//        MemberProfile customUser = userRepository.findById(userid).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
//        return customUser.toResponse();
//    }
//
//    public MemberProfile getUserEntityById(Long userId) {
//        MemberProfile customUser = userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
//        return customUser;
//    }
//


}
