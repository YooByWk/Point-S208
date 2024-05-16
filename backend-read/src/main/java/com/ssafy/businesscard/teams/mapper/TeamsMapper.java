package com.ssafy.businesscard.teams.mapper;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.Filter;
import com.ssafy.businesscard.teams.dto.TeamMemberListResponseDto;
import com.ssafy.businesscard.teams.entity.TeamAlbumDetail;
import com.ssafy.businesscard.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import javax.swing.*;

@Mapper(componentModel = "spring")
public interface TeamsMapper {
    PrivateAlbumResponseDto toDto(Businesscard businesscard);
    FilterListResponseDto toDto(Filter filter);
    TeamMemberListResponseDto toDto(User user);

    @Mapping(source = "teamAlbumDetail.businesscard.cardId", target = "cardId")
    @Mapping(source = "teamAlbumDetail.businesscard.name", target = "name")
    @Mapping(source = "teamAlbumDetail.businesscard.rank", target = "rank")
    @Mapping(source = "teamAlbumDetail.businesscard.department", target = "department")
    @Mapping(source = "teamAlbumDetail.businesscard.email", target = "email")
    @Mapping(source = "teamAlbumDetail.businesscard.landlineNumber", target = "landlineNumber")
    @Mapping(source = "teamAlbumDetail.businesscard.faxNumber", target = "faxNumber")
    @Mapping(source = "teamAlbumDetail.businesscard.phoneNumber", target = "phoneNumber")
    @Mapping(source = "teamAlbumDetail.businesscard.address", target = "address")
    @Mapping(source = "teamAlbumDetail.businesscard.realPicture", target = "realPicture")
    @Mapping(source = "teamAlbumDetail.businesscard.frontBack", target = "frontBack")
    @Mapping(source = "teamAlbumDetail.businesscard.domainUrl", target = "domainUrl")
    @Mapping(source = "teamAlbumDetail.memo", target = "memo")
    PrivateAlbumResponseDto toDto(TeamAlbumDetail teamAlbumDetail);

}
