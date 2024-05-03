package com.ssafy.businesscard.domain.myalbum.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PrivateAlbumMapper {
    Businesscard toEntity(CardRequest cardRequest);
}
