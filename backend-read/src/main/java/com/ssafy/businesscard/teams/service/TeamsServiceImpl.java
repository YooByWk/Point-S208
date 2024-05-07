package com.ssafy.businesscard.teams.service;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.Filter;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumMemberRepository;
import com.ssafy.businesscard.teams.dto.TeamListResponseDto;
import com.ssafy.businesscard.teams.dto.TeamMemberListResponseDto;
import com.ssafy.businesscard.teams.entity.TeamAlbum;
import com.ssafy.businesscard.teams.entity.TeamAlbumDetail;
import com.ssafy.businesscard.teams.entity.TeamAlbumMember;
import com.ssafy.businesscard.teams.entity.TeamMember;
import com.ssafy.businesscard.teams.mapper.TeamsMapper;
import com.ssafy.businesscard.teams.repository.TeamAlbumDetailRepository;
import com.ssafy.businesscard.teams.repository.TeamAlbumMemberRepository;
import com.ssafy.businesscard.teams.repository.TeamAlbumRepository;
import com.ssafy.businesscard.teams.repository.TeamMemberRepository;
import com.ssafy.businesscard.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamsServiceImpl implements TeamsService{

    private final TeamAlbumRepository teamAlbumRepository;
    private final TeamAlbumMemberRepository teamAlbumMemberRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;
    private final TeamsMapper teamsMapper;

    //팀 명함 목록 조회
    @Override
    public List<TeamListResponseDto> getTeamList(Long userId){
        List<TeamMember> teamMembers = teamMemberRepository.findByUser_UserId(userId);

        List<TeamListResponseDto> teamList = teamMembers.stream()
                .map(teamMember -> {

                    TeamAlbum teamAlbum = teamMember.getTeamAlbum();
                    String teamName = teamAlbum.getTeamName();
                    Long teamAlbumId = teamAlbum.getTeamAlbumId();

                    int teamSize = teamMemberRepository.countByTeamAlbum_TeamAlbumId(teamAlbumId);
                    int cardSize = teamAlbumDetailRepository.countByTeamAlbum_TeamAlbumId(teamAlbumId);

                    return new TeamListResponseDto(teamAlbumId, teamName, teamSize, cardSize);
                })
                .collect(Collectors.toList());

        return teamList;
    }

    //팀 내 명함 조회
    @Override
    public List<PrivateAlbumResponseDto> getTeamAlbumList(Long teamAlbumId, int page){
        int size = 12;

        Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.cardId").descending());
        Page<TeamAlbumDetail> teamAlbumPage = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId, pageable);

        List<PrivateAlbumResponseDto> responseDtoList = teamAlbumPage.getContent().stream()
                .map(teamAlbumDetail -> new PrivateAlbumResponseDto(
                        teamAlbumDetail.getBusinesscard().getCardId(),
                        teamAlbumDetail.getBusinesscard().getName(),
                        teamAlbumDetail.getBusinesscard().getCompany(),
                        teamAlbumDetail.getBusinesscard().getPosition(),
                        teamAlbumDetail.getBusinesscard().getRank(),
                        teamAlbumDetail.getBusinesscard().getDepartment(),
                        teamAlbumDetail.getBusinesscard().getEmail(),
                        teamAlbumDetail.getBusinesscard().getLandlineNumber(),
                        teamAlbumDetail.getBusinesscard().getFaxNumber(),
                        teamAlbumDetail.getBusinesscard().getPhoneNumber(),
                        teamAlbumDetail.getBusinesscard().getAddress(),
                        teamAlbumDetail.getBusinesscard().getRealPicture(),
                        teamAlbumDetail.getBusinesscard().getFrontBack(),
                        teamAlbumDetail.getBusinesscard().getDomainUrl(),
                        teamAlbumDetail.getMemo()
                )).collect(Collectors.toList());

        return responseDtoList;
    }

    //팀의 팀원 조회
    @Override
    public List<TeamMemberListResponseDto> getTeamMemberList(Long userId, Long teamAlbumId){
        List<TeamMemberListResponseDto> teamMembers = new ArrayList<>();
        //me
        TeamMember me = teamMemberRepository.findByUser_userIdAndTeamAlbum_TeamAlbumId(userId, teamAlbumId);
        if (me != null) {
            teamMembers.add(new TeamMemberListResponseDto(me.getUser().getUserId(), me.getUser().getEmail(), me.getUser().getName()));
        }
        //other member
        List<TeamMember> otherMembers = teamMemberRepository.findByTeamAlbum_TeamAlbumIdAndUser_UserIdNot(teamAlbumId, userId);
        for (TeamMember member : otherMembers) {
            teamMembers.add(new TeamMemberListResponseDto(member.getUser().getUserId(), member.getUser().getEmail(), member.getUser().getName()));
        }
        return teamMembers;
    }

    //팀 명함 상세 조회
    @Override
    public PrivateAlbumResponseDto getTeamAlbumDtail(Long teamAlbumId, Long cardId){
        Optional<TeamAlbumDetail> optionalTeamAlbumDetail = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumIdAndBusinesscard_cardId(teamAlbumId, cardId);
//        if(optionalTeamAlbumDetail.isPresent()){
//            TeamAlbumDetail teamAlbumDetail = optionalTeamAlbumDetail.get();
//            return PrivateAlbumResponseDto.builder()
//                    .cardId(teamAlbumDetail.getBusinesscard().getCardId())
//                    .name(teamAlbumDetail.getBusinesscard().getName())
//                    .company(teamAlbumDetail.getBusinesscard().getCompany())
//                    .position(teamAlbumDetail.getBusinesscard().getPosition())
//                    .rank(teamAlbumDetail.getBusinesscard().getRank())
//                    .department(teamAlbumDetail.getBusinesscard().getDepartment())
//                    .email(teamAlbumDetail.getBusinesscard().getEmail())
//                    .landlineNumber(teamAlbumDetail.getBusinesscard().getLandlineNumber())
//                    .faxNumber(teamAlbumDetail.getBusinesscard().getFaxNumber())
//                    .phoneNumber(teamAlbumDetail.getBusinesscard().getPhoneNumber())
//                    .address(teamAlbumDetail.getBusinesscard().getAddress())
//                    .realPicture(teamAlbumDetail.getBusinesscard().getRealPicture())
//                    .frontBack(teamAlbumDetail.getBusinesscard().getFrontBack())
//                    .domainUrl(teamAlbumDetail.getBusinesscard().getDomainUrl())
//                    .memo(teamAlbumDetail.getMemo())
//                    .build();
//        } else {
//            throw new NoSuchElementException("카드가 없음");
//        }
        if(optionalTeamAlbumDetail.isPresent()){
            TeamAlbumDetail teamAlbumDetail = optionalTeamAlbumDetail.get();
            return teamsMapper.toDto(teamAlbumDetail.getBusinesscard());
        } else {
            throw new NoSuchElementException("카드가 없음");
        }
    }

    //엑셀로 내보내기용 팀 명함 목록조회
    @Override
    public List<PrivateAlbumResponseDto> getTeamAlbumAllList(Long teamAlbumId){
        List<TeamAlbumDetail> teamAlbumDetails = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId);
        List<Businesscard> businesscards = teamAlbumDetails.stream().map(bc -> bc.getBusinesscard()).toList();
        List<PrivateAlbumResponseDto> dtos = businesscards.stream().map(teamsMapper::toDto).toList();
        return dtos;
    }

    //필터 목록 조회
    @Override
    public List<FilterListResponseDto> getFilter(Long teamsAlbumDetailId){
        List<TeamAlbumMember> teamAlbumMembers = teamAlbumMemberRepository.findByTeamAlbumDetail_TeamAlbumDetailId(teamsAlbumDetailId);
        List<Filter> filters = teamAlbumMembers.stream().map(filter -> filter.getFilter()).toList();
        List<FilterListResponseDto> dtos = filters.stream().map(teamsMapper::toDto).toList();
        return dtos;
    }

    //필터 별 명함 조회


    //상세보기에서 명함마다 필터 뭐있는지 조회
}
