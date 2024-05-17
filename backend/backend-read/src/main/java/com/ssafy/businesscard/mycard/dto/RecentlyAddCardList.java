package com.ssafy.businesscard.mycard.dto;

public record RecentlyAddCardList(
        Long cardId,
        String name,
        String company,
        String email,
        String phoneNumber,
        String realPicture
) {
}
