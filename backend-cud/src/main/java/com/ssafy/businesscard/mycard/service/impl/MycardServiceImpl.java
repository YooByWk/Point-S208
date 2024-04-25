package com.ssafy.businesscard.mycard.service.impl;

import com.ssafy.businesscard.card.entity.Businesscard;
import com.ssafy.businesscard.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import com.ssafy.businesscard.mycard.dto.request.MycardRegistRequest;
import com.ssafy.businesscard.mycard.service.MycardService;
import com.ssafy.businesscard.user.entity.User;
import com.ssafy.businesscard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MycardServiceImpl implements MycardService {
    private final UserRepository userRepository;
    private final BusinesscardRepository businesscardRepository;

    // 내 명함 직접 입력으로 등록
    @Override
    public void registerCard(Long userId, MycardRegistRequest registRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER));
        Optional<Businesscard> card = businesscardRepository.findByUser_userIdAndFrontBack(userId, registRequest.frontBack());
        if (card.isEmpty()) {
            businesscardRepository.save(Businesscard.builder()
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .department(registRequest.department())
                    .position(registRequest.position())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .realPicture(registRequest.realPicture())
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        } else {
            businesscardRepository.save(Businesscard.builder()
                    .cardId(card.get().getCardId())
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .department(registRequest.department())
                    .position(registRequest.position())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .realPicture(registRequest.realPicture())
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        }
    }

    @Override
    public void update(Long userId, Long cardId, MycardRegistRequest registRequest) {
        System.out.println("regist : " + registRequest.toString());
        Businesscard businesscard = businesscardRepository.findByUser_userIdAndCardId(userId, cardId);

    }

}
