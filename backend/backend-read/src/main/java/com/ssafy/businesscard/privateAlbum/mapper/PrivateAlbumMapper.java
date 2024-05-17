package com.ssafy.businesscard.privateAlbum.mapper;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.Filter;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PrivateAlbumMapper {

    PrivateAlbumResponseDto toDto(Businesscard businesscard);
    FilterListResponseDto toDto(Filter filter);

    @Mapping(source = "privateAlbum.businesscard.cardId", target = "cardId")
    @Mapping(source = "privateAlbum.businesscard.name", target = "name")
    @Mapping(source = "privateAlbum.businesscard.company", target = "company")
    @Mapping(source = "privateAlbum.businesscard.position", target = "position")
    @Mapping(source = "privateAlbum.businesscard.rank", target = "rank")
    @Mapping(source = "privateAlbum.businesscard.department", target = "department")
    @Mapping(source = "privateAlbum.businesscard.email", target = "email")
    @Mapping(source = "privateAlbum.businesscard.landlineNumber", target = "landlineNumber")
    @Mapping(source = "privateAlbum.businesscard.faxNumber", target = "faxNumber")
    @Mapping(source = "privateAlbum.businesscard.phoneNumber", target = "phoneNumber")
    @Mapping(source = "privateAlbum.businesscard.address", target = "address")
    @Mapping(source = "privateAlbum.businesscard.realPicture", target = "realPicture")
    @Mapping(source = "privateAlbum.businesscard.frontBack", target = "frontBack")
    @Mapping(source = "privateAlbum.businesscard.domainUrl", target = "domainUrl")
    @Mapping(source = "privateAlbum.memo", target = "memo")
    PrivateAlbumResponseDto toDto(PrivateAlbum privateAlbum);
}
