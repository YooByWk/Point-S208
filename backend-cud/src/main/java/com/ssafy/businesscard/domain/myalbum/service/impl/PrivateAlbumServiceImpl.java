package com.ssafy.businesscard.domain.myalbum.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.mapper.BusinesscardMapper;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardSharedRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.PrivateAlbumRequest;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumFilterRepository;
import com.ssafy.businesscard.domain.myalbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.domain.myalbum.repository.privateAlbum.PrivateAlbumRepository;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumService;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumDetailRepository;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumRepository;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import com.ssafy.businesscard.global.s3.servcie.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class PrivateAlbumServiceImpl implements PrivateAlbumService {

    private final UserRepository userRepository;
    private final BusinesscardRepository businesscardRepository;
    private final BusinesscardMapper businesscardMapper;
    private final PrivateAlbumFilterRepository privateAlbumFilterRepository;
    private final PrivateAlbumRepository privateAlbumRepository;
    private final PrivateAlbumMemberRepository privateAlbumMemberRepository;
    private final AmazonS3Service amazonS3Service;
    private final TeamAlbumRepository teamAlbumRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;

    // 명함 지갑에 명함 등록
    @Override
    @Transactional
    public void regist(Long userId, CardRequest request) {
        User user = findUser(userId);
        Businesscard businesscard = businesscardMapper.toEntity(request);
        if (isCardExist(userId, businesscard)) {
            throw new UserException(UserErrorCode.ALREADY_IN_CARD);
        } else {
            businesscardRepository.save(businesscard);
            PrivateAlbumRequest privateAlbumRequest = PrivateAlbumRequest.builder()
                    .user(user)
                    .businesscard(businesscard)
                    .favorite(false)
                    .build();
            addPrivateAlbum(privateAlbumRequest);
        }
    }

    // 명함 지갑에 OCR로 명함 등록
    @Override
    @Transactional
    public void registCard(Long userId, MultipartFile image, CardRequest request) {
        User user = findUser(userId);
        String url = amazonS3Service.uploadThunmail(image).getUrl();
        Businesscard businesscard = businesscardMapper.toEntity(request);
        businesscard.setRealPicture(url);

        if (isCardExist(userId, businesscard)) {
            throw new UserException(UserErrorCode.ALREADY_IN_CARD);
        } else {
            businesscardRepository.save(businesscard);
            PrivateAlbumRequest privateAlbumRequest = PrivateAlbumRequest.builder()
                    .user(user)
                    .businesscard(businesscard)
                    .favorite(false)
                    .build();
            addPrivateAlbum(privateAlbumRequest);
        }
    }

    @Override
    public void registSharedCard(Long userId, CardSharedRequest cardSharedRequest) {
        User user = findUser(userId);
        List<Businesscard> businesscards = new ArrayList<>();
        // List<CardReqeust> requests = new ArrayList<>();
        cardSharedRequest.cardIds().forEach(aLong -> {
            Businesscard businesscard = businesscardRepository.findById(aLong)
                    .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_CARD));
            // CardReqeust request = businesscardMapper.toDto(businesscard)
            // requests.add(request)
            businesscards.add(businesscard);

            List<PrivateAlbum> privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_email(userId, businesscard.getEmail());

            if (privateAlbum.size() != 0) {
                throw new UserException(UserErrorCode.ALREADY_IN_CARD);
            }

        });

        businesscards.forEach(businesscard1 -> {
            // Businesscard newbusinesscard1 = businesscardMapper.toEntity(businesscard1)
            // businesscardRepository.save(newbusinesscard1)
            Businesscard newbusinesscard1 = businesscardRepository.save(Businesscard.builder()
                    .email(businesscard1.getEmail())
                    .department(businesscard1.getDepartment())
                    .name(businesscard1.getName())
                    .domainUrl(businesscard1.getDomainUrl())
                    .frontBack(businesscard1.getFrontBack())
                    .address(businesscard1.getAddress())
                    .company(businesscard1.getCompany())
                    .digitalPicture(businesscard1.getDigitalPicture())
                    .faxNumber(businesscard1.getFaxNumber())
                    .landlineNumber(businesscard1.getLandlineNumber())
                    .position(businesscard1.getPosition())
                    .phoneNumber(businesscard1.getPhoneNumber())
                    .rank(businesscard1.getRank())
                    .user(businesscard1.getUser())
                    .realPicture(businesscard1.getRealPicture())
                    .build());

            PrivateAlbumRequest privateAlbumRequest = PrivateAlbumRequest.builder()
                    .user(user)
                    .businesscard(newbusinesscard1)
                    .favorite(false)
                    .build();

            addPrivateAlbum(privateAlbumRequest);
        });

    }

    // 내 명함지갑에 있는 명함 팀 명함에 공유
    @Override
    @Transactional
    public void shareCard(Long userId, Long teamId, CardSharedRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
        List<Businesscard> businesscardList = new ArrayList<>();
        // cardId list를 반복하여 businesscard를 businesscardList에 추가
        request.cardIds().forEach(cardId -> {
            Businesscard businesscard = businesscardRepository.findById(cardId)
                    .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_CARD));

            // 이미 등록된 명함이 있는지 확인
            TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumIdAndBusinesscard_Email(
                    teamId, businesscard.getEmail()
            );
            if (teamAlbumDetail == null)
                businesscardList.add(businesscard);
        });

        // businesscardList를 반복하여 businesscard를 db에 저장하고 teamAlbumDetail에 저장
        businesscardList.forEach(businesscard -> {
            CardRequest cardRequest = businesscardMapper.toDto(businesscard);
            Businesscard card = businesscardMapper.toEntity(cardRequest);

            businesscardRepository.save(card);
            teamAlbumDetailRepository.save(TeamAlbumDetail.builder()
                    .teamAlbum(teamAlbum)
                    .businesscard(card)
                    .build());
        });
    }

    // 명함 중복 검사
    private boolean isCardExist(Long userId, Businesscard businesscard) {
        List<PrivateAlbum> privateAlbumList = privateAlbumRepository.findAllByUser_userId(userId);
        for (PrivateAlbum privateAlbum : privateAlbumList) {
            if (privateAlbum.getBusinesscard().getEmail().equals(businesscard.getEmail())) {
                return true;
            }
        }
        return false;
    }

    // 명함 지갑에 명함 등록 로직
    private void addPrivateAlbum(PrivateAlbumRequest request) {
        privateAlbumRepository.save(PrivateAlbum.builder()
                .user(request.user())
                .businesscard(request.businesscard())
                .favorite(request.favorite())
                .build());
    }

    // 명함에 필터 추가
    @Override
    @Transactional
    public void addFilter(Long userId, Long cardId, List<CardAddFilterRequest> request) {
        User user = findUser(userId);
        List<Long> filterIdList = new ArrayList<>();
        for (CardAddFilterRequest cardAddFilterRequest : request) {
            filterIdList.add(cardAddFilterRequest.filterId());
        }

        for (Long filterId : filterIdList) {
            Filter filter = privateAlbumFilterRepository.findById(filterId)
                    .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_FILTER));
            PrivateAlbum privateAlbum = privateAlbumRepository.
                    findByUser_userIdAndBusinesscard_cardId(userId, cardId);
            privateAlbumMemberRepository.findByPrivateAlbum_Businesscard_CardIdAndFilter_FilterId(
                    privateAlbum.getBusinesscard().getCardId(), filterId
            ).ifPresent(privateAlbumMember1 -> {throw new UserException(UserErrorCode.ALREADY_ADD_FILTER);
            });
            privateAlbumMemberRepository.save(PrivateAlbumMember.builder()
                    .filter(filter)
                    .user(user)
                    .privateAlbum(privateAlbum)
                    .build());
        }
    }

    // 명함에 등록된 필터 제거
    @Override
    public void deleteFilter(Long userId, Long cardId, Long filterId) {
        User user = findUser(userId);
        PrivateAlbumMember privateAlbumMember = privateAlbumMemberRepository.findByPrivateAlbum_Businesscard_CardIdAndFilter_FilterId(
                cardId, filterId)
                .orElseThrow(() -> new UserException(UserErrorCode.BAD_REQUEST));
        privateAlbumMemberRepository.delete(privateAlbumMember);
    }

    // 명함지갑 명함 수정
    @Override
    @Transactional
    public void updateCard(Long userId, Long cardId, CardRequest request) {
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_cardId(userId, cardId);
        Businesscard card = privateAlbum.getBusinesscard();
        businesscardRepository.save(Businesscard.builder()
                .cardId(card.getCardId())
                .name(request.name())
                .company(request.company())
                .position(request.position())
                .rank(request.rank())
                .department(request.department())
                .email(request.email())
                .landlineNumber(request.landlineNumber())
                .faxNumber(request.faxNumber())
                .phoneNumber(request.phoneNumber())
                .address(request.address())
                .realPicture(card.getRealPicture())
                .frontBack(request.frontBack())
                .domainUrl(request.domainUrl())
                .build());
    }

    // 명함지갑 명함 삭제
    @Override
    @Transactional
    public void deleteCard(Long userId, Long cardId) {
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_cardId(userId, cardId);

        List<PrivateAlbum> privateAlbumList = privateAlbumRepository.findByUser_userIdAndBusinesscard_email(
                privateAlbum.getUser().getUserId(), privateAlbum.getBusinesscard().getEmail());
        privateAlbumRepository.deleteAll(privateAlbumList);
    }

    // 명함에 메모 등록 및 수정
    @Override
    public String cardMemo(Long userId, Long cardId, MemoRequest request) {
        PrivateAlbum privateAlbum = privateAlbumRepository.findByUser_userIdAndBusinesscard_cardId(userId, cardId);
        // 메모가 없다면 메모 등록
        if (privateAlbum.getMemo() == null) {
            privateAlbumRepository.save(PrivateAlbum.builder()
                    .privateAlbumId(privateAlbum.getPrivateAlbumId())
                    .businesscard(privateAlbum.getBusinesscard())
                    .user(privateAlbum.getUser())
                    .favorite(privateAlbum.isFavorite())
                    .memo(request.memo())
                    .build());
            return "메모가 등록되었습니다.";
        } else { // 메모가 있다면 메모 수정
            privateAlbumRepository.save(PrivateAlbum.builder()
                    .privateAlbumId(privateAlbum.getPrivateAlbumId())
                    .businesscard(privateAlbum.getBusinesscard())
                    .user(privateAlbum.getUser())
                    .favorite(privateAlbum.isFavorite())
                    .memo(request.memo())
                    .build());
            return "메모가 수정되었습니다.";
        }
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
    }
}
