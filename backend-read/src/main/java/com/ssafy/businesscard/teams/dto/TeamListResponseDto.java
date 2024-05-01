package com.ssafy.businesscard.teams.dto;

public record TeamListResponseDto(
        Long teamAlbumId,
        String teamName,
        int teamSize,
        int cardSize
) {
}
