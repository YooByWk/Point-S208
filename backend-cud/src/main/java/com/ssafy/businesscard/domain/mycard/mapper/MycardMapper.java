package com.ssafy.businesscard.domain.mycard.mapper;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.mycard.dto.request.MycardRegistRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MycardMapper {


    Businesscard toBusinesscard(MycardRegistRequest registRequest);
}
