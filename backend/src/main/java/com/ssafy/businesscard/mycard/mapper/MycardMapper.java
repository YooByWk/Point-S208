package com.ssafy.businesscard.mycard.mapper;

import com.ssafy.businesscard.card.entity.Businesscard;
import com.ssafy.businesscard.mycard.dto.request.MycardRegistRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MycardMapper {

    Businesscard toBusinesscard(MycardRegistRequest registRequest);
}
