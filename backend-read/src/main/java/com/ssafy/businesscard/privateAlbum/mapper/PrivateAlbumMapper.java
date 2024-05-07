package com.ssafy.businesscard.privateAlbum.mapper;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PrivateAlbumMapper {

    PrivateAlbumResponseDto toDto(PrivateAlbum privateAlbum);
    PrivateAlbumResponseDto toDto(Businesscard businesscard);
}
