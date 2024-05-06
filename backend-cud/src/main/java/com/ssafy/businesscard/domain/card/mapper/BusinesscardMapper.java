package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.dto.request.CardRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BusinesscardMapper {

    Businesscard toEntity(CardRequest cardRequest);

}
