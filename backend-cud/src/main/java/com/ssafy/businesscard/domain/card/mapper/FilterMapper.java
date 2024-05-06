package com.ssafy.businesscard.domain.card.mapper;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.card.entity.Filter;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FilterMapper {
    Filter toEntity(FilterRequest filterRequest);
}
