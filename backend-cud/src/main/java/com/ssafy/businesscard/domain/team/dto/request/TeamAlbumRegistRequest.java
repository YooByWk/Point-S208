package com.ssafy.businesscard.domain.team.dto.request;

import com.ssafy.businesscard.domain.user.entity.User;
import lombok.Builder;

import java.util.List;

@Builder
public record TeamAlbumRegistRequest(
          String teamName,
          List<Long> userList
) {


}
