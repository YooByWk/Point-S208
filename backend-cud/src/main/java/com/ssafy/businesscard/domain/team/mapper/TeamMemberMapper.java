package com.ssafy.businesscard.domain.team.mapper;

import com.ssafy.businesscard.domain.team.dto.request.TeamMemberRequest;
import com.ssafy.businesscard.domain.team.entity.TeamMember;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeamMemberMapper {
    TeamMember toEntity(TeamMemberRequest teamMemberRequest);
}
