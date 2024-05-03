package com.ssafy.businesscard.domain.myalbum.service.impl;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.card.service.BusinessCardService;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.PrivateAlbumRequest;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.domain.myalbum.mapper.PrivateAlbumMapper;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumFilterRepository;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.domain.myalbum.repository.privateAlbum.PrivateAlbumRepository;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PrivateAlbumServiceImpl implements PrivateAlbumService {

    private final UserRepository userRepository;
    private final BusinesscardRepository businesscardRepository;
    private final PrivateAlbumMapper privateAlbumMapper;
    private final PrivateAlbumFilterRepository privateAlbumFilterRepository;
    private final PrivateAlbumRepository privateAlbumRepository;
    private final PrivateAlbumMemberRepository privateAlbumMemberRepository;
    private final BusinessCardService businessCardService;

    // 명함 지갑에 명함 등록
    @Override
    @Transactional
    public String registCard(Long userId, CardRequest request) {
//        System.out.println("resgistCard 로직 시작 ---------------------------");
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
        ));
//        System.out.println("유저 정보 User : " + user);
        Businesscard businesscard = privateAlbumMapper.toEntity(request);
//        System.out.println("businesscard : " + businesscard);
        boolean check = businessCardService.checkCard(businesscard);
//        System.out.println("check : " + check);

        if (check) {
            Businesscard card = businesscardRepository.findByEmailAndFrontBack(businesscard.getEmail(), businesscard.getFrontBack());
//            System.out.println("card : " + card);
            PrivateAlbumRequest privateAlbumRequest = PrivateAlbumRequest.builder()
                    .user(user)
                    .businesscard(card)
                    .favorite(false)
                    .build();
            return addPrivateAlbum(privateAlbumRequest);
        } else {
            businesscardRepository.save(businesscard);
//            System.out.println("businesscard" + businesscard);
            PrivateAlbumRequest privateAlbumRequest = PrivateAlbumRequest.builder()
                    .user(user)
                    .businesscard(businesscard)
                    .favorite(false)
                    .build();
            return addPrivateAlbum(privateAlbumRequest);
        }
//        System.out.println("resgistCard 로직 끝 ---------------------------");
    }
    private String addPrivateAlbum(PrivateAlbumRequest request) {
//        System.out.println("addPrivateAlbum 로직 시작 -----------------------------");
//        System.out.println("request : " + request);
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_CardId(
                request.user().getUserId(), request.businesscard().getCardId()
        );
        if (privateAlbum == null) {
            privateAlbumRepository.save(PrivateAlbum.builder()
                    .user(request.user())
                    .businesscard(request.businesscard())
                    .favorite(request.favorite())
                    .build());
            return "등록 성공";
        } else {
            return "존재하는 명함";
        }
//        System.out.println("addPrivateAlbum 로직 끝 -----------------------------");
    }

    // 명함에 필터 추가
    @Override
    @Transactional
    public void addFilter(Long userId, Long cardId, List<CardAddFilterRequest> request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
                ));

        List<Long> filterIdList = new ArrayList<>();
        for (CardAddFilterRequest cardAddFilterRequest : request) {
            filterIdList.add(cardAddFilterRequest.filterId());
        }

        for (Long filterId : filterIdList) {
            Filter filter = privateAlbumFilterRepository.findById(filterId)
                            .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                                    GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_FILTER
                            ));
            PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_CardId(userId, cardId);
            privateAlbumMemberRepository.save(PrivateAlbumMember.builder()
                            .filter(filter)
                            .user(user)
                            .privateAlbum(privateAlbum)
                    .build());
        }
    }

    // 명함지갑 명함 수정
    @Override
    public void updateCard(Long userId, Long cardId, CardRequest request) {
        Businesscard businesscard = privateAlbumMapper.toEntity(request);
        businesscardRepository.save(businesscard);
    }

    // 명함지갑 명함 삭제
    @Override
    @Transactional
    public void deleteCard(Long userId, Long cardId) {
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_CardId(userId, cardId);
        System.out.println("privateAlbum : " + privateAlbum);
        List<PrivateAlbum> privateAlbumList = privateAlbumRepository
                .findByUser_userIdAndBusinesscard_email(privateAlbum.getUser().getUserId(), privateAlbum.getBusinesscard().getEmail());
        privateAlbumRepository.deleteAll(privateAlbumList);
    }
}
