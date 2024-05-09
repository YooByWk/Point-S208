package com.ssafy.businesscard.user.service;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.mycard.repository.BusinesscardRepository;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import com.ssafy.businesscard.privateAlbum.repository.PrivateAlbumRepository;
import com.ssafy.businesscard.teams.entity.TeamAlbum;
import com.ssafy.businesscard.teams.entity.TeamAlbumDetail;
import com.ssafy.businesscard.teams.repository.TeamAlbumDetailRepository;
import com.ssafy.businesscard.user.dto.UserInfoResponseDto;
import com.ssafy.businesscard.user.dto.UserRequestDto;
import com.ssafy.businesscard.user.entity.User;
import com.ssafy.businesscard.user.mapper.UserMapper;
import com.ssafy.businesscard.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BusinesscardRepository businesscardRepository;
    private final PrivateAlbumRepository privateAlbumRepository;
    private final TeamAlbumDetailRepository teamAlbumDetailRepository;


    /**
     *userId return을 위한 tutorial
     */
    @Override
    public long findUserId(UserRequestDto userRequestDto) {
        Long userId = userRepository.findUserIdByNameAndEmail(userRequestDto.name(), userRequestDto.email());
        if(userId != null){
            return userId;
        }else{

            User user = User.builder()
                    .name(userRequestDto.name())
                    .email(userRequestDto.email())
                    .build();
            User saveUser = userRepository.save(user);
            return saveUser.getUserId();
        }
    }

    //user 정보 검색
    @Override
    public List<UserInfoResponseDto> searchUser(String info){

        List<User> users = userRepository.findAllByNameContainingOrEmailContaining(info, info);
        List<UserInfoResponseDto> dtos = new ArrayList<>();

        for (User user : users) {
            dtos.add(new UserInfoResponseDto(user.getUserId(), user.getName(), user.getEmail()));
        }
        return dtos;
    }

    //카드 검색
    @Override
    public List<PrivateAlbumResponseDto> searchCard(String info){

        List<Businesscard> cards = businesscardRepository.findAllByNameContainingOrCompanyContaining(info, info);
        List<PrivateAlbumResponseDto> dtos = new ArrayList<>();

        for (Businesscard card : cards) {
            dtos.add(PrivateAlbumResponseDto.builder()
                    .cardId(card.getCardId())
                    .name(card.getName())
                    .company(card.getCompany())
                    .position(card.getPosition())
                    .rank(card.getRank())
                    .department(card.getDepartment())
                    .email(card.getEmail())
                    .landlineNumber(card.getLandlineNumber())
                    .faxNumber(card.getFaxNumber())
                    .phoneNumber(card.getPhoneNumber())
                    .address(card.getAddress())
                    .realPicture(card.getRealPicture())
                    .frontBack(card.getFrontBack())
                    .domainUrl(card.getDomainUrl())
                    .build());
        }
        return dtos;
    }

    //명함 지갑 검색
    @Override
    public List<PrivateAlbumResponseDto> searchMyAlbumCard(Long userId, String info){

        List<PrivateAlbum> privateAlbums = privateAlbumRepository.findByUser_userId(userId);
        List<PrivateAlbumResponseDto> dtos = new ArrayList<>();
        //검색 조건(이름, 이메일, 회사)에 맞게 검색된거 dto에
        for (PrivateAlbum privateAlbum : privateAlbums) {
            Businesscard businesscard = privateAlbum.getBusinesscard();

            String name = businesscard.getName();
            String email = businesscard.getEmail();
            String company = businesscard.getCompany();

            if (name.contains(info) || email.contains(info) || company.contains(info)) {

                dtos.add(PrivateAlbumResponseDto.builder()
                        .cardId(businesscard.getCardId())
                        .name(name)
                        .company(businesscard.getCompany())
                        .position(businesscard.getPosition())
                        .rank(businesscard.getRank())
                        .department(businesscard.getDepartment())
                        .email(email)
                        .landlineNumber(businesscard.getLandlineNumber())
                        .faxNumber(businesscard.getFaxNumber())
                        .phoneNumber(businesscard.getPhoneNumber())
                        .address(businesscard.getAddress())
                        .realPicture(businesscard.getRealPicture())
                        .frontBack(businesscard.getFrontBack())
                        .domainUrl(businesscard.getDomainUrl())
                        .build());
            }
        }
        return dtos;
    }
    //팀 명함 검색
    @Override
    public List<PrivateAlbumResponseDto> searchTeamsCard(Long teamAlbumId, String info){

        List<TeamAlbumDetail> teamAlbumDetails = teamAlbumDetailRepository.findByTeamAlbum_TeamAlbumId(teamAlbumId);
        List<PrivateAlbumResponseDto> dtos = new ArrayList<>();
        for (TeamAlbumDetail teamAlbumDetail : teamAlbumDetails){
            Businesscard businesscard = teamAlbumDetail.getBusinesscard();

            String name = businesscard.getName();
            String email = businesscard.getEmail();

            if (name.contains(info) || email.contains(info)) {
                dtos.add(PrivateAlbumResponseDto.builder()
                        .cardId(businesscard.getCardId())
                        .name(name)
                        .company(businesscard.getCompany())
                        .position(businesscard.getPosition())
                        .rank(businesscard.getRank())
                        .department(businesscard.getDepartment())
                        .email(email)
                        .landlineNumber(businesscard.getLandlineNumber())
                        .faxNumber(businesscard.getFaxNumber())
                        .phoneNumber(businesscard.getPhoneNumber())
                        .address(businesscard.getAddress())
                        .realPicture(businesscard.getRealPicture())
                        .frontBack(businesscard.getFrontBack())
                        .domainUrl(businesscard.getDomainUrl())
                        .build());
            }
        }
        return dtos;
    }
}
