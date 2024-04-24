package com.ssafy.businesscard.mycard.mapper;

import com.ssafy.businesscard.card.model.entity.Businesscard;
import com.ssafy.businesscard.mycard.model.dto.request.MycardRegistRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MycardMapper {

    Businesscard toBusinesscard(MycardRegistRequest registRequest);
}
