package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.mapper.BusinesscardMapper;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumDetailRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumDetailRepository;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumFilterRepository;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumMemberRepository;
import com.ssafy.businesscard.domain.team.repository.TeamAlbumRepository;
import com.ssafy.businesscard.domain.team.service.TeamAlbumCardService;
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

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamAlbumCardServiceImpl implements TeamAlbumCardService {

    private final BusinesscardMapper businesscardMapper;
    private final BusinesscardRepository businesscardRepository;
    private final UserRepository userRepository;
    private final TeamAlbumRepository teamAlbumRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;
    private final TeamAlbumFilterRepository teamAlbumFilterRepository;
    private final TeamAlbumMemberRepository teamAlbumMemberRepository;
    private final AmazonS3Service amazonS3Service;
    // 팀 명함지갑에 명함 등록
    @Override
    @Transactional
    public void regist(Long userId, Long teamAlbumId, CardRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
        Businesscard businesscard = businesscardMapper.toEntity(request);

        if (isCardExist(teamAlbum.getTeamAlbumId(), businesscard)) {
            throw new UserException(UserErrorCode.ALREADY_IN_CARD);
        } else {
            businesscardRepository.save(businesscard);
            TeamAlbumDetailRequest teamAlbumDetailRequest = TeamAlbumDetailRequest.builder()
                    .teamAlbum(teamAlbum)
                    .businesscard(businesscard)
                    .memo(null)
                    .build();
            addCardToTeamAlbumDetail(teamAlbumDetailRequest);
        }
    }

    // 팀 명함지갑에 OCR로 명함 등록
    @Override
    @Transactional
    public void registCard(Long userId, Long teamAlbumId, MultipartFile image, CardRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
        String url = amazonS3Service.uploadThunmail(image).getUrl();
        Businesscard businesscard = businesscardMapper.toEntity(request);
        businesscard.setRealPicture(url);

        if (isCardExist(teamAlbum.getTeamAlbumId(), businesscard)) {
            throw new UserException(UserErrorCode.ALREADY_IN_CARD);
        } else {
            businesscardRepository.save(businesscard);
            TeamAlbumDetailRequest teamAlbumDetailRequest = TeamAlbumDetailRequest.builder()
                    .teamAlbum(teamAlbum)
                    .businesscard(businesscard)
                    .build();
            addCardToTeamAlbumDetail(teamAlbumDetailRequest);
        }
    }

    // 명함 중복 검사
    private boolean isCardExist(Long teamAlbumId, Businesscard businesscard) {
        List<TeamAlbumDetail> teamAlbumDetailList = teamAlbumDetailRepository.findAllByTeamAlbum_teamAlbumId(teamAlbumId);
        for (TeamAlbumDetail teamAlbumDetail : teamAlbumDetailList) {
            if (teamAlbumDetail.getBusinesscard() != null &&
                    teamAlbumDetail.getBusinesscard().getEmail().equals(businesscard.getEmail())) {
                return true;
            }
        }
        return false;
    }

    // 팀 명함지갑에 명함 등록 로직
    private void addCardToTeamAlbumDetail(TeamAlbumDetailRequest request) {
        teamAlbumDetailRepository.save(TeamAlbumDetail.builder()
                .teamAlbum(request.teamAlbum())
                .businesscard(request.businesscard())
                .memo(request.memo())
                .build());
    }

    // 팀 명함지갑에 명함 수정
    @Override
    @Transactional
    public void updateCard(Long userId, Long teamAlbumId, Long cardId, CardRequest request) {
        TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                teamAlbumId, cardId);
        businesscardRepository.save(Businesscard.builder()
                .cardId(teamAlbumDetail.getBusinesscard().getCardId())
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
                .realPicture(teamAlbumDetail.getBusinesscard().getRealPicture())
                .frontBack(request.frontBack())
                .domainUrl(request.domainUrl())
                .build());
    }

    // 팀 명함지갑에서 명함 삭제
    @Override
    public void deleteCard(Long userId, Long teamAlbumId, Long cardId) {
        TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                teamAlbumId, cardId
        );
        teamAlbumDetailRepository.delete(teamAlbumDetail);
    }

    // 팀 명함지갑 명함에 필터 추가
    @Override
    @Transactional
    public void addFilter(Long userId, Long teamAlbumId, Long cardId, List<CardAddFilterRequest> requestList) {
        TeamAlbum teamAlbum = findTeam(teamAlbumId);
        List<Long> filterIdList = requestList.stream().map(CardAddFilterRequest::filterId).toList();
        for (Long filterId : filterIdList) {
            Filter filter = teamAlbumFilterRepository.findById(filterId)
                    .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_FILTER));
            log.info("[filter] : {}", filter);
            TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                    teamAlbumId, cardId);
            log.info("[teamAlbumDetail] : {}", teamAlbumDetail);
            teamAlbumMemberRepository.findByTeamAlbumDetail_Businesscard_CardIdAndFilter_FilterId(
                    teamAlbumDetail.getBusinesscard().getCardId(), filterId
            ).ifPresent(teamAlbumMember -> {throw new UserException(UserErrorCode.ALREADY_ADD_FILTER);
            });
            teamAlbumMemberRepository.save(TeamAlbumMember.builder()
                    .filter(filter)
                    .teamAlbum(teamAlbum)
                    .teamAlbumDetail(teamAlbumDetail)
                    .build());
        }
    }

    // 팀 명함지갑 명함에 메모 등록 및 수정
    @Override
    public String cardMemo(Long userId, Long teamAlbumId, Long cardId, MemoRequest request) {
        TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                teamAlbumId, cardId
        );
        // 메모가 없다면 메모 등록
        if (teamAlbumDetail.getMemo() == null) {
            teamAlbumDetailRepository.save(TeamAlbumDetail.builder()
                    .teamAlbumDetailId(teamAlbumDetail.getTeamAlbumDetailId())
                    .teamAlbum(teamAlbumDetail.getTeamAlbum())
                    .businesscard(teamAlbumDetail.getBusinesscard())
                    .memo(request.memo())
                    .build());
            return "메모가 등록되었습니다.";
        } else {
            teamAlbumDetailRepository.save(TeamAlbumDetail.builder()
                    .teamAlbumDetailId(teamAlbumDetail.getTeamAlbumDetailId())
                    .teamAlbum(teamAlbumDetail.getTeamAlbum())
                    .businesscard(teamAlbumDetail.getBusinesscard())
                    .memo(request.memo())
                    .build());
            return "메모가 수정되었습니다.";
        }
    }

    // 팀 내 명함에 추가된 필터 제거
    @Override
    public void deleteFilter(Long userId, Long teamAlbumId, Long cardId, Long filterId) {
        User user = findUser(userId);
        TeamAlbumMember teamAlbumMember = teamAlbumMemberRepository.findByTeamAlbumDetail_Businesscard_CardIdAndFilter_FilterId(
                cardId, filterId
        ).orElseThrow(() -> new UserException(UserErrorCode.BAD_REQUEST));
        teamAlbumMemberRepository.delete(teamAlbumMember);
    }

    private User findUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new UserException(UserErrorCode.NOT_EXISTS_USER));
    }

    private TeamAlbum findTeam(Long teamId) {
        return teamAlbumRepository.findById(teamId)
                .orElseThrow(() -> new UserException(UserErrorCode.NOT_EXITSTS_TEAM));
    }
}
