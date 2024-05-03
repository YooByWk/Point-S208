package com.ssafy.businesscard.domain.myalbum.dto.request;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.user.entity.User;
import lombok.Builder;

@Builder
public record PrivateAlbumRequest(
        User user,
        Businesscard businesscard,
        boolean favorite
) {
}
