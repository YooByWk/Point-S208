package com.ssafy.businesscard.domain.team.dto.request;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import lombok.Builder;

@Builder
public record TeamAlbumDetailRequest(
        TeamAlbum teamAlbum,
        Businesscard businesscard
) {
}
