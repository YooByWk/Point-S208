package com.ssafy.businesscard.teams.service;

import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import com.ssafy.businesscard.teams.dto.TeamListResponseDto;
import com.ssafy.businesscard.teams.dto.TeamMemberListResponseDto;
import com.ssafy.businesscard.teams.entity.TeamAlbum;
import com.ssafy.businesscard.teams.entity.TeamAlbumDetail;
import com.ssafy.businesscard.teams.entity.TeamMember;
import com.ssafy.businesscard.teams.repository.TeamAlbumDetailRepository;
import com.ssafy.businesscard.teams.repository.TeamAlbumMemberRepository;
import com.ssafy.businesscard.teams.repository.TeamAlbumRepository;
import com.ssafy.businesscard.teams.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeamsServiceImpl implements TeamsService{

    private final TeamAlbumRepository teamAlbumRepository;
    private final TeamAlbumMemberRepository teamAlbumMemberRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;

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
                        teamAlbumDetail.getBusinesscard().getEmail(),
                        teamAlbumDetail.getBusinesscard().getLandlineNumber(),
                        teamAlbumDetail.getBusinesscard().getFaxNumber(),
                        teamAlbumDetail.getBusinesscard().getPhoneNumber(),
                        teamAlbumDetail.getBusinesscard().getAddress(),
                        teamAlbumDetail.getBusinesscard().getRealPicture(),
                        teamAlbumDetail.getBusinesscard().getFrontBack(),
                        teamAlbumDetail.getBusinesscard().getDomainUrl()
                )).collect(Collectors.toList());

        return responseDtoList;
    }

    //팀의 팀원 조회
    @Override
    public List<TeamMemberListResponseDto> getTeamMemberList(Long teamAlbumId){
        return null;
    }
}
