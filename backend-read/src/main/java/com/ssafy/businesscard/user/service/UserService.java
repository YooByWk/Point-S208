package com.ssafy.businesscard.user.service;

import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.user.dto.UserInfoResponseDto;
import com.ssafy.businesscard.user.dto.UserRequestDto;

import java.util.List;

public interface UserService {
    public long findUserId(UserRequestDto userRequestDto);
    public List<UserInfoResponseDto> searchUser(String info);
    public List<PrivateAlbumResponseDto> searchCard(String info);
    public List<PrivateAlbumResponseDto> searchMyAlbumCard(Long userId, String info);
    public List<PrivateAlbumResponseDto> searchTeamsCard(Long teamAlbumId, String info);
}
