package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import com.ssafy.businesscard.domain.myalbum.dto.request.CardSharedRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SharedBusinesscardMapper {

    Businesscard toEntity(CardSharedRequest  cardSharedRequest);

}
