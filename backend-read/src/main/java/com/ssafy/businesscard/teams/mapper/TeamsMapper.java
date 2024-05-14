package com.ssafy.businesscard.teams.mapper;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.Filter;
import com.ssafy.businesscard.teams.dto.TeamMemberListResponseDto;
import com.ssafy.businesscard.user.entity.User;
import org.mapstruct.Mapper;

import javax.swing.*;

@Mapper(componentModel = "spring")
public interface TeamsMapper {
    PrivateAlbumResponseDto toDto(Businesscard businesscard);
    FilterListResponseDto toDto(Filter filter);
    TeamMemberListResponseDto toDto(User user);

}
