package com.ssafy.businesscard.user.service;

import com.ssafy.businesscard.user.exception.UserErrorCode;
import com.ssafy.businesscard.user.exception.UserException;
import com.ssafy.businesscard.user.model.dto.request.UserRegisterRequest;
import com.ssafy.businesscard.user.model.dto.response.UserResponse;
import com.ssafy.businesscard.user.model.entity.User;
import com.ssafy.businesscard.user.model.entity.MemberProfile;
import com.ssafy.businesscard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
 import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;


    public void registUser(UserRegisterRequest request) {
        // 등록하려는 유저정보가 이미 DB에 있으면 예외처리
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new UserException(UserErrorCode.ALREADY_IN_EMAIL);
        });

        // 유저 객체를 DB에 저장
        userRepository.save(User.builder()
                .email(request.getEmail())
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
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = null;

        User customUser = userRepository.findByEmail(email).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
        return customUser.toUserResponse(customUser);
    }

//    public Member getNowUserInfoEntityByToken() {
//        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String email = (String) principal;
//
//        Member customUser = userRepository.findByEmail(email).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
//        return customUser;
//    }


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
