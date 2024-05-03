package com.ssafy.businesscard.domain.mycard.service.impl;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import com.ssafy.businesscard.domain.mycard.dto.request.MycardRegistRequest;
import com.ssafy.businesscard.domain.mycard.service.MycardService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
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
        Optional<Businesscard> myBusinessCard = businesscardRepository.findByUser_userIdAndFrontBack(userId, registRequest.frontBack());
        if (myBusinessCard.isEmpty()) {
            businesscardRepository.save(Businesscard.builder()
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .department(registRequest.department())
                    .position(registRequest.position())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .realPicture(registRequest.realPicture())
                    .digitalPicture("digital")
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        } else {
            businesscardRepository.save(Businesscard.builder()
                    .cardId(myBusinessCard.get().getCardId())
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .department(registRequest.department())
                    .position(registRequest.position())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .realPicture(registRequest.realPicture())
                    .digitalPicture("digital")
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        }
    }

    // 내 명함 정보 수정
    @Override
    public void update(Long userId, Long cardId, MycardRegistRequest registRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER));
        Businesscard myBusinessCard = businesscardRepository.findByUser_userIdAndCardId(userId, cardId);
        businesscardRepository.save(Businesscard.builder()
                .cardId(myBusinessCard.getCardId())
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

    // 내 명함 삭제
    @Override
    public void delete(Long userId) {
        List<Businesscard> myBusinessCards = businesscardRepository.findAllByUser_userId(userId);
        businesscardRepository.deleteAll(myBusinessCards);
    }

}
