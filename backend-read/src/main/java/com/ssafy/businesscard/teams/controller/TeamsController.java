package com.ssafy.businesscard.teams.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.teams.dto.TeamListResponseDto;
import com.ssafy.businesscard.teams.service.TeamsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class TeamsController {

    private final TeamsService teamsService;
    
    //팀 리스트 조회
    @GetMapping("/teams/{user_id}")
    public ResponseEntity<List<TeamListResponseDto>> getTeamList(@PathVariable("user_id")Long userId){
        List<TeamListResponseDto> list = teamsService.getTeamList(userId);
        return ResponseEntity.ok().body(MessageUtils.success(list).getDataBody());
    }

    //팀 명함

}
