package com.ssafy.businesscard.domain.team.dto.request;

import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import com.ssafy.businesscard.domain.user.entity.User;
import lombok.Builder;

@Builder
public record TeamMemberRequest(
        User user,
        TeamAlbum teamAlbum
) {
}
