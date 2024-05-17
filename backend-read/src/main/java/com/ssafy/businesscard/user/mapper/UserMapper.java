package com.ssafy.businesscard.user.mapper;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    PrivateAlbumResponseDto toDto(Businesscard businesscard);
}
