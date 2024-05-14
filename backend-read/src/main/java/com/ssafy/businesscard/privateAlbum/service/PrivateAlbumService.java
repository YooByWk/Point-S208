package com.ssafy.businesscard.privateAlbum.service;

import com.ssafy.businesscard.privateAlbum.dto.FilterCardResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumListDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;

import java.util.List;


public interface PrivateAlbumService {

    public List<PrivateAlbumResponseDto> getAlbumList(Long userId, int page);
    public List<PrivateAlbumResponseDto> getAlbumListSort(Long userId, int page, String sort);
    public PrivateAlbumResponseDto getAlbumDtail(Long userId, Long cardId);
    public List<FilterListResponseDto> getFilter(Long userId);
    public FilterCardResponseDto getFilterCard(Long userId, Long filterId);
    public List<PrivateAlbumResponseDto> getAlbumAllList(Long userId);
    public List<FilterListResponseDto> getAlbumDtailFilter(Long userId, Long cardId);
}
