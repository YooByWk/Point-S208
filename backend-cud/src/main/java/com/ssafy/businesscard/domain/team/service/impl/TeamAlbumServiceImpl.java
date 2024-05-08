package com.ssafy.businesscard.domain.team.service.impl;

import com.ssafy.businesscard.domain.card.dto.request.CardAddFilterRequest;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.card.dto.request.MemoRequest;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.card.mapper.BusinesscardMapper;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.team.dto.request.MemberRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumDetailRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.domain.team.dto.request.TeamMemberRequest;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
import com.ssafy.businesscard.domain.team.entity.TeamMember;
import com.ssafy.businesscard.domain.team.repository.*;
import com.ssafy.businesscard.domain.team.service.TeamAlbumService;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.global.exception.GlobalExceptionHandler;
import com.ssafy.businesscard.global.s3.servcie.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TeamAlbumServiceImpl implements TeamAlbumService {

    private final UserRepository userRepository;
    private final TeamAlbumRepository teamAlbumRepository;
    private final BusinesscardMapper businesscardMapper;
    private final BusinesscardRepository businesscardRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;
    private final TeamAlbumFilterRepository teamAlbumFilterRepository;
    private final TeamAlbumMemberRepository teamAlbumMemberRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final AmazonS3Service amazonS3Service;
    // 팀 명함지갑 생성(건너뛰기)
    @Override
    @Transactional
    public void create(Long userId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);
        TeamAlbum checkTeamAlbum = teamAlbumRepository.findByUser_userIdAndTeamName(userId, teamAlbumRegistRequest.teamName());
        if (checkTeamAlbum == null) {
            TeamAlbum teamAlbum = teamAlbumRepository.save(TeamAlbum.builder()
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .user(user)
                    .teamAlbum(teamAlbum)
                    .build();
            addTeamMember(teamMemberRequest);
        } else {
            throw new GlobalExceptionHandler.UserException(
                    GlobalExceptionHandler.UserErrorCode.ALREADY_IN_TEAM
            );
        }
    }

    // 팀 명함지갑 생성(구성원추가)
    @Override
    public void createTeamAlbum(Long userId, TeamAlbumRegistRequest teamAlbumRequest) {
        User user = findUser(userId);
        TeamAlbum checkTeamAlbum = teamAlbumRepository.findByUser_userIdAndTeamName(userId, teamAlbumRequest.teamName());
        if (checkTeamAlbum == null) {
            TeamAlbum teamAlbum = teamAlbumRepository.save(TeamAlbum.builder()
                    .teamName(teamAlbumRequest.teamName())
                    .user(user)
                    .build());
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .user(user)
                    .teamAlbum(teamAlbum)
                    .build();
            addTeamMember(teamMemberRequest);
            if (teamAlbumRequest.userList() != null) {
                addMemberList(teamAlbum, teamAlbumRequest.userList());
            }
        } else {
            throw new GlobalExceptionHandler.UserException(
                    GlobalExceptionHandler.UserErrorCode.ALREADY_IN_TEAM
            );
        }
    }

    private void addMemberList(TeamAlbum teamAlbum, List<Long> userIdList){
        List<User> userList = new ArrayList<>();
        for (Long userInfo : userIdList) {
            User user = userRepository.findById(userInfo).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                    GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
            ));
            userList.add(user);
        }
        for (User user : userList) {
            TeamMemberRequest teamMemberRequest = TeamMemberRequest.builder()
                    .teamAlbum(teamAlbum)
                    .user(user)
                    .build();
            addTeamMember(teamMemberRequest);
        }
    }

    // 팀 명함지갑 생성시 팀 구성원에 등록
    private void addTeamMember(TeamMemberRequest teamMemberRequest) {
        TeamMember teamMember = teamMemberRepository.findByTeamAlbum_TeamAlbumIdAndUser_UserId(
                teamMemberRequest.teamAlbum().getTeamAlbumId(), teamMemberRequest.user().getUserId()
        );
        if (teamMember == null) {
            teamMemberRepository.save(TeamMember.builder()
                    .user(teamMemberRequest.user())
                    .teamAlbum(teamMemberRequest.teamAlbum())
                    .build());
        } else {
            throw new GlobalExceptionHandler.UserException(GlobalExceptionHandler.UserErrorCode.ALREADY_IN_TEAMMEMBER);
        }
    }

    // 팀 명함지갑 이름 수정
    @Override
    @Transactional
    public String update(Long userId, Long teamId, TeamAlbumRegistRequest teamAlbumRegistRequest) {
        User user = findUser(userId);

        TeamAlbum teamAlbum = findTeam(teamId);

        if (teamAlbum.getUser().equals(user)) {
            teamAlbumRepository.save(TeamAlbum.builder()
                    .teamAlbumId(teamAlbum.getTeamAlbumId())
                    .teamName(teamAlbumRegistRequest.teamName())
                    .user(user)
                    .build());
            return "팀 이름이 변경되었습니다.";
        } else {
            return "Owner가 아닙니다.";
        }
    }

    // 팀 명함지갑 삭제
    @Override
    @Transactional
    public String delete(Long userId, Long teamId) {
        User user = findUser(userId);
        TeamAlbum teamAlbum = findTeam(teamId);
        if (teamAlbum.getUser().equals(user)) {
            teamAlbumRepository.delete(teamAlbum);
            return "팀 명함지갑이 삭제되었습니다.";
        } else {
            return "Owner가 아닙니다.";
        }
    }

    // 팀 명함지갑에 명함 등록
    @Override
    @Transactional
    public void regist(Long userId, Long teamAlbumId, CardRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
                ));
        Businesscard businesscard = businesscardMapper.toEntity(request);

        if (isCardExist(teamAlbum.getTeamAlbumId(), businesscard)) {
            throw new GlobalExceptionHandler.UserException(
                    GlobalExceptionHandler.UserErrorCode.ALREADY_IN_CARD
            );
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
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
                ));
        String url = amazonS3Service.uploadThunmail(image).getUrl();
        Businesscard businesscard = businesscardMapper.toEntity(request);
        businesscard.setRealPicture(url);

        if (isCardExist(teamAlbum.getTeamAlbumId(), businesscard)) {
            throw new GlobalExceptionHandler.UserException(
                    GlobalExceptionHandler.UserErrorCode.ALREADY_IN_CARD
            );
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
                .realPicture(request.realPicture())
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
                    .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                            GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_FILTER
                    ));
            TeamAlbumDetail teamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(
                    teamAlbumId, cardId);
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

    // 팀 명함지갑에 구성원 추가
    @Override
    public void addMember(Long userId, Long teamAlbumId, MemberRequest request) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamAlbumId)
                .orElseThrow(() -> new GlobalExceptionHandler.UserException(
                        GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
                ));
        addMemberList(teamAlbum, request.userList());
    }

    // 팀 명함지갑 구성원 삭제
    @Override
    public void deleteMember(Long userId, Long teamAlbumId, Long memberId) {
        TeamMember teamMember = teamMemberRepository.findByTeamAlbum_TeamAlbumIdAndUser_UserId(teamAlbumId, memberId);
        teamMemberRepository.delete(teamMember);
    }

    private User findUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXISTS_USER
        ));
        return user;
    }

    private TeamAlbum findTeam(Long teamId) {
        TeamAlbum teamAlbum = teamAlbumRepository.findById(teamId).orElseThrow(() -> new GlobalExceptionHandler.UserException(
                GlobalExceptionHandler.UserErrorCode.NOT_EXITSTS_TEAM
        ));
        return teamAlbum;
    }
}

