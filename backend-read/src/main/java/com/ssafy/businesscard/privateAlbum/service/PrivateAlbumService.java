package com.ssafy.businesscard.privateAlbum.service;

import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumListDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;

import java.util.List;


public interface PrivateAlbumService {

    public List<PrivateAlbumResponseDto> getAlbumList(Long userId, int page);
}
