package com.ssafy.businesscard.teams.mapper;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import org.mapstruct.Mapper;

import javax.swing.*;

@Mapper(componentModel = "spring")
public interface TeamsMapper {
    PrivateAlbumResponseDto toDto(Businesscard businesscard);
}
