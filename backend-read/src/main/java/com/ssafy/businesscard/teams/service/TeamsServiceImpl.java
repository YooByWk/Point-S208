package com.ssafy.businesscard.teams.service;

import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.FilterCardResponseDto;
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
import jakarta.transaction.Transactional;
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

        List<TeamListResponseDto> dtos = teamMembers.stream()
                .map(teamMember -> {

                    TeamAlbum teamAlbum = teamMember.getTeamAlbum();
                    String teamName = teamAlbum.getTeamName();
                    Long teamAlbumId = teamAlbum.getTeamAlbumId();

                    int teamSize = teamMemberRepository.countByTeamAlbum_TeamAlbumId(teamAlbumId);
                    int cardSize = teamAlbumDetailRepository.countByTeamAlbum_TeamAlbumId(teamAlbumId);

                    return new TeamListResponseDto(teamAlbumId, teamName, teamSize, cardSize);
                })
                .collect(Collectors.toList());

        return dtos;
    }

    //팀 내 명함 조회
    @Override
    public List<PrivateAlbumResponseDto> getTeamAlbumList(Long teamAlbumId, int page){
        int size = 12;

        Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.cardId").descending());
        Page<TeamAlbumDetail> teamAlbumPage = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId, pageable);
        List<PrivateAlbumResponseDto> dtos = teamAlbumPage.stream()
                .map(bc -> bc.getBusinesscard())
                .map(teamsMapper::toDto).toList();
        return dtos;
    }

    //명함지갑에서 목록조회 정렬(이름, 회사, 최신)
    @Override
    public List<PrivateAlbumResponseDto> getTeamAlbumListSort(Long teamAlbumId, int page, String sort){
        int size = 12;
        if(sort.equals("이름순")){

            Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.name"));
            Page<TeamAlbumDetail> teamAlbumPage = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId, pageable);
            List<Businesscard> businesscards = teamAlbumPage.stream().map(bc -> bc.getBusinesscard()).toList();
            List<PrivateAlbumResponseDto> dtos = businesscards.stream().map(teamsMapper::toDto).toList();
            return dtos;

        } else if (sort.equals("회사순")) {

            Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.company"));
            Page<TeamAlbumDetail> teamAlbumPage = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId, pageable);
            List<Businesscard> businesscards = teamAlbumPage.stream().map(bc -> bc.getBusinesscard()).toList();
            List<PrivateAlbumResponseDto> dtos = businesscards.stream().map(teamsMapper::toDto).toList();
            return dtos;

        }else {

            Pageable pageable = PageRequest.of(page, size, Sort.by("businesscard.cardId").descending());
            Page<TeamAlbumDetail> teamAlbumPage = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId, pageable);
            List<Businesscard> businesscards = teamAlbumPage.stream().map(bc -> bc.getBusinesscard()).toList();
            List<PrivateAlbumResponseDto> dtos = businesscards.stream().map(teamsMapper::toDto).toList();
            return dtos;
        }
    }

    //팀의 팀원 조회
    @Override
    public List<TeamMemberListResponseDto> getTeamMemberList(Long userId, Long teamAlbumId){
        List<TeamMemberListResponseDto> dtos = new ArrayList<>();
        //me
        TeamMember me = teamMemberRepository.findByUser_userIdAndTeamAlbum_TeamAlbumId(userId, teamAlbumId);
        if (me != null) {
            dtos.add(new TeamMemberListResponseDto(me.getUser().getUserId(), me.getUser().getEmail(), me.getUser().getName()));
        }
        //other member
        List<TeamMember> otherMembers = teamMemberRepository.findByTeamAlbum_TeamAlbumIdAndUser_UserIdNot(teamAlbumId, userId);
        for (TeamMember member : otherMembers) {
            dtos.add(new TeamMemberListResponseDto(member.getUser().getUserId(), member.getUser().getEmail(), member.getUser().getName()));
        }
        return dtos;
    }

    //팀 명함 상세 조회
    @Override
    public PrivateAlbumResponseDto getTeamAlbumDtail(Long teamAlbumId, Long cardId){
        Optional<TeamAlbumDetail> teamAlbumDetailOptional  = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumIdAndBusinesscard_cardId(teamAlbumId, cardId);
        if(teamAlbumDetailOptional.isPresent()){
            TeamAlbumDetail teamAlbumDetail = teamAlbumDetailOptional.get();
//            Businesscard businesscard = teamAlbumDetail.getBusinesscard();
            return teamsMapper.toDto(teamAlbumDetail);
        }else{
            throw new UserException(UserErrorCode.NO_CARD);
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
    @Override
    public FilterCardResponseDto getFilterCard(Long teamAlbumId, Long filterId){
        List<TeamAlbumMember> members = teamAlbumMemberRepository.findByTeamAlbum_TeamAlbumIdAndFilter_filterId(teamAlbumId, filterId);
        List<TeamAlbumDetail> teamAlbumDetails = members.stream().map(details ->details.getTeamAlbumDetail()).toList();
        List<Businesscard> businesscards = teamAlbumDetails.stream().map(bc ->bc.getBusinesscard()).toList();
        List<PrivateAlbumResponseDto> list = businesscards.stream().map(teamsMapper::toDto).toList();
        FilterCardResponseDto dto = new FilterCardResponseDto(filterId, list);
        return dto;
    }

    //상세보기에서 명함마다 필터 뭐있는지 조회
    @Override
    @Transactional
    public List<FilterListResponseDto> getAlbumDtailFilter(Long teamAlbumId, Long cardId){
        Optional<TeamAlbumDetail> teamAlbumDetails = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumIdAndBusinesscard_cardId(teamAlbumId, cardId);
        TeamAlbumDetail teamAlbumDetail = teamAlbumDetails.get();
        List<TeamAlbumMember> teamAlbumMembers = teamAlbumDetail.getTeamAlbumMemberList();
        List<Filter> filters = teamAlbumMembers.stream().map(teamAlbumMember -> teamAlbumMember.getFilter()).toList();
        List<FilterListResponseDto> dtos = filters.stream().map(teamsMapper::toDto).toList();
        return dtos;
    }
}
