package com.ssafy.businesscard.domain.team.controller;

import com.ssafy.businesscard.domain.team.dto.request.TeamAlbumRegistRequest;
import com.ssafy.businesscard.global.utils.MessageUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/teams")
public class TeamController {

    @PostMapping("/{user_id}")
    public ResponseEntity<MessageUtils> regist(@PathVariable Long user_id, @RequestBody TeamAlbumRegistRequest teamAlbumRegistRequest) {
        return null;
    }


}
