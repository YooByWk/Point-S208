package com.ssafy.businesscard.user.service;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.mycard.repository.BusinesscardRepository;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
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

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BusinesscardRepository businesscardRepository;


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
}
