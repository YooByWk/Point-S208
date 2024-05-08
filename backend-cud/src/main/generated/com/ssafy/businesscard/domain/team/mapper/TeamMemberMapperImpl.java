package com.ssafy.businesscard.domain.team.mapper;

import com.ssafy.businesscard.domain.team.dto.request.TeamMemberRequest;
import com.ssafy.businesscard.domain.team.entity.TeamMember;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-08T21:08:04+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.1 (Oracle Corporation)"
)
@Component
public class TeamMemberMapperImpl implements TeamMemberMapper {

    @Override
    public TeamMember toEntity(TeamMemberRequest teamMemberRequest) {
        if ( teamMemberRequest == null ) {
            return null;
        }

        TeamMember.TeamMemberBuilder teamMember = TeamMember.builder();

        teamMember.user( teamMemberRequest.user() );
        teamMember.teamAlbum( teamMemberRequest.teamAlbum() );

        return teamMember.build();
    }
}
