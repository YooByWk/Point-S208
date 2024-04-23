package com.ssafy.backend.domain.education.mapper;

import com.ssafy.backend.domain.education.dto.EducationDto;
import com.ssafy.backend.domain.education.entity.Education;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface EducationMapper {
	@Mapping(source = "education.bookPageSentence.bookPageSentenceId", target = "bookPageSentenceId")
	EducationDto toEducationDto(Education education);
}
