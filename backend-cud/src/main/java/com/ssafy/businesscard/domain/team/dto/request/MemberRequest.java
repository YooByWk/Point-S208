package com.ssafy.businesscard.domain.team.dto.request;

import java.util.List;

public record MemberRequest(
        List<Long> userList
) {
}
