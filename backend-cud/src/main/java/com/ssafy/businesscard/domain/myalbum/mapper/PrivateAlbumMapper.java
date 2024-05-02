package com.ssafy.businesscard.domain.myalbum.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.myalbum.dto.request.UpdateCardRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PrivateAlbumMapper {

    Businesscard toEntity(UpdateCardRequest updateCardRequest);
}
