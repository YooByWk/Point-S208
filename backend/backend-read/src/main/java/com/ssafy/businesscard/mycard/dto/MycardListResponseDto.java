package com.ssafy.businesscard.mycard.dto;

import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
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
public class MycardListResponseDto {

    private Long userId;                //내명함 userId
    private MycardResponseDto front;    //내명함 앞면
    private MycardResponseDto back;     //내명함 뒷면
    private List<PrivateAlbumResponseDto> list = new ArrayList<>();  //내명함 최근 추가한 명함
}
