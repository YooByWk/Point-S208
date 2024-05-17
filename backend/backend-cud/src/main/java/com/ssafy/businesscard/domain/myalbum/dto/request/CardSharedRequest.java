package com.ssafy.businesscard.domain.myalbum.dto.request;

import java.util.List;

public record CardSharedRequest(
        List<Long> cardIds
) {

}
