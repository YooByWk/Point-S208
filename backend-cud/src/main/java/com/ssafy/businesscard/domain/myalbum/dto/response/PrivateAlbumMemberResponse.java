package com.ssafy.businesscard.domain.myalbum.dto.response;

import com.ssafy.businesscard.domain.card.entity.Filter;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.domain.user.entity.User;
import lombok.Builder;

@Builder
public record PrivateAlbumMemberResponse(
        Filter filter,
        User user,
        PrivateAlbum privateAlbum
) {
}
