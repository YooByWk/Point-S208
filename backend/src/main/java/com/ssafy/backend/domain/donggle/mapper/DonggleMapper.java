package com.ssafy.backend.domain.donggle.mapper;

import com.ssafy.backend.domain.donggle.dto.response.DonggleResponseDto;
import com.ssafy.backend.domain.donggle.entity.Donggle;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface DonggleMapper {
	DonggleResponseDto toDonggleResponseDto(Donggle donggle);
}
