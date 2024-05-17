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
public class FilterCardResponseDto {
    private Long filterId;
    private List<PrivateAlbumResponseDto> cardList = new ArrayList<>();  //명함 지갑 카드 목록
}
