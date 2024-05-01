package com.ssafy.businesscard.teams.service;

import com.ssafy.businesscard.teams.dto.TeamListResponseDto;

import java.util.List;

public interface TeamsService {
    public List<TeamListResponseDto> getTeamList(Long userId);
}
