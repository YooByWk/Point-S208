package com.ssafy.businesscard.privateAlbum.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PrivateAlbumListDto {

    private int total;                  //전체 카드 갯수
    private Long startCardId;           //시작 id
    private Long endCardId;             //마지막 카드 id
    private List<PrivateAlbumResponseDto> card = new ArrayList<>();  //명함 지갑 카드 목록
}
