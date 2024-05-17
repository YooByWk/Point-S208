package com.ssafy.businesscard.teams.dto;

public record TeamMemberListResponseDto(
        Long userId,
        String email,
        String name

) {
}
