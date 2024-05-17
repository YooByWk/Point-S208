package com.ssafy.businesscard.domain.mycard.service.impl;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.mycard.dto.request.MycardRegistRequest;
import com.ssafy.businesscard.domain.mycard.service.MycardService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import com.ssafy.businesscard.global.s3.servcie.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MycardServiceImpl implements MycardService {
    private final UserRepository userRepository;
    private final BusinesscardRepository businesscardRepository;
    private final AmazonS3Service amazonS3Service;

    // 내 명함 직접 입력으로 등록
    @Override
    public void regist(Long userId, MycardRegistRequest registRequest) {
        User user = findUser(userId);
        Optional<Businesscard> myBusinessCard = businesscardRepository.findByUser_userIdAndFrontBack(
                userId, registRequest.frontBack());
        // 명함이 존재하지 않으면 신규 등록
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
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        } else { // 명함이 존재한다면 재등록
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
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        }
    }

    // ocr로 내명함 등록
    @Override
    public void registCard(Long userId, MultipartFile image, MycardRegistRequest registRequest) {
        User user = findUser(userId);
        Optional<Businesscard> myBusinessCard = businesscardRepository.findByUser_userIdAndFrontBack(
                userId, registRequest.frontBack()
        );

        String url = amazonS3Service.uploadThunmail(image).getUrl();

        if (myBusinessCard.isEmpty()) {
            businesscardRepository.save(Businesscard.builder()
                    .name(registRequest.name())
                    .company(registRequest.company())
                    .department(registRequest.department())
                    .position(registRequest.position())
                    .email(registRequest.email())
                    .landlineNumber(registRequest.landlineNumber())
                    .phoneNumber(registRequest.phoneNumber())
                    .realPicture(url)
                    .digitalPicture(registRequest.digitalPicture())
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
                    .realPicture(url)
                    .digitalPicture(registRequest.digitalPicture())
                    .frontBack(registRequest.frontBack())
                    .user(user)
                    .build());
        }
    }

    // 내 명함 정보 수정
    @Override
    public void update(Long userId, Long cardId, MycardRegistRequest registRequest) {
        User user = findUser(userId);
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

    // 디지털 명함 저장
    @Override
    public void save(Long userId, Long cardId, MultipartFile file) {
        Businesscard myBusinessCard = businesscardRepository.findByUser_userIdAndCardId(userId, cardId);
        String url = amazonS3Service.uploadThunmail(file).getUrl();
        myBusinessCard.setDigitalPicture(url);
        businesscardRepository.save(myBusinessCard);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
    }
}
