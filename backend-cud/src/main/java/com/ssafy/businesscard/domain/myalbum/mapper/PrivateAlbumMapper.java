package com.ssafy.businesscard.domain.myalbum.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.repository.BusinesscardRepository;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardRequest;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PrivateAlbumMapper {
    PrivateAlbumMapper INSTANCE = Mappers.getMapper(PrivateAlbumMapper.class);
    Businesscard toEntity(CardRequest cardRequest);

    @Mapping(source = "businesscard.cardId", target = "cardId")
    CardRequest fromEntity(Businesscard businesscard);

}
