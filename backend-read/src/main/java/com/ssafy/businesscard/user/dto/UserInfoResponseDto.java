package com.ssafy.businesscard.user.dto;

public record UserInfoResponseDto(
        Long userId,
        String name,
        String email
) {
}
