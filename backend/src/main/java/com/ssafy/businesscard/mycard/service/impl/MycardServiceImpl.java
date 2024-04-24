package com.ssafy.businesscard.mycard.service.impl;

import com.ssafy.businesscard.card.model.entity.Businesscard;
import com.ssafy.businesscard.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import com.ssafy.businesscard.mycard.model.dto.request.MycardRegistRequest;
import com.ssafy.businesscard.mycard.service.MycardService;
import com.ssafy.businesscard.user.entity.User;
import com.ssafy.businesscard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MycardServiceImpl implements MycardService {
    private final UserRepository userRepository;
    private final BusinesscardRepository businesscardRepository;
    
    @Override
    public void registerCard(Long userId, MycardRegistRequest registRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalExceptionHandler.UserException(GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER));
        Optional<Businesscard> card = businesscardRepository.findByUser_userId(userId);
        if (card.isEmpty()) {
            businesscardRepository.save(Businesscard.builder()
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .position(registRequest.position())
                    .rank(registRequest.rank())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .faxNumber(registRequest.faxNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .address(registRequest.address())
                    .realPicture(registRequest.realPicture())
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .domainUrl(registRequest.domainUrl())
                    .user(user)
                    .build());
        } else {
            businesscardRepository.save(Businesscard.builder()
                    .cardId(card.get().getCardId())
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .position(registRequest.position())
                    .rank(registRequest.rank())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .faxNumber(registRequest.faxNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .address(registRequest.address())
                    .realPicture(registRequest.realPicture())
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .domainUrl(registRequest.domainUrl())
                    .user(user)
                    .build());
        }
        
    }
}
