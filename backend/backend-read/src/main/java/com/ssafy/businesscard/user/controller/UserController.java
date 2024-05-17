package com.ssafy.businesscard.user.controller;

import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.user.dto.UserInfoResponseDto;
import com.ssafy.businesscard.user.dto.UserRequestDto;
import com.ssafy.businesscard.user.service.UserService;
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
public class UserController {

    private final UserService userService;

    //튜토리얼
    @PostMapping("/tutorial")
    public ResponseEntity<?> tutorial(@RequestBody UserRequestDto userRequestDto){
        Long userId = userService.findUserId(userRequestDto);
        return ResponseEntity.ok().body(MessageUtils.success(userId));
    }

    // user 검색
    @GetMapping("/user/search")
    public ResponseEntity<List<UserInfoResponseDto>> searchUser(@RequestParam("info") String info){
        List<UserInfoResponseDto> userInfoResponseDtos = userService.searchUser(info);
        return ResponseEntity.ok().body(MessageUtils.success(userInfoResponseDtos).getDataBody());
    }

    //명함 검색
    @GetMapping("/card/search")
    public ResponseEntity<List<PrivateAlbumResponseDto>> searchCard(@RequestParam("info") String info){
        List<PrivateAlbumResponseDto> dtos = userService.searchCard(info);
        return ResponseEntity.ok().body(MessageUtils.success(dtos).getDataBody());
    }

    //명함 지갑 검색
    @GetMapping("/my-album/{user_id}/search")
    public ResponseEntity<List<PrivateAlbumResponseDto>> searchMyAlbumCard(@PathVariable("user_id") Long userId, @RequestParam("info") String info){
        List<PrivateAlbumResponseDto> dtos = userService.searchMyAlbumCard(userId, info);
        return ResponseEntity.ok().body(MessageUtils.success(dtos).getDataBody());
    }
    //팀 명함 검색
    @GetMapping("/teams/{team_album_id}/search")
    public ResponseEntity<List<PrivateAlbumResponseDto>> searchTeamsCard(@PathVariable("team_album_id") Long teamAlbumId, @RequestParam("info") String info){
        List<PrivateAlbumResponseDto> dtos = userService.searchTeamsCard(teamAlbumId, info);
        return ResponseEntity.ok().body(MessageUtils.success(dtos).getDataBody());
    }

    // 링크로 공유
    @GetMapping("/share/{card_id}")
    public ResponseEntity<?> shareCard(@PathVariable("card_id") Long cardId, @RequestParam("email") String email){
        PrivateAlbumResponseDto dto = userService.shareCard(cardId, email);
        if(dto == null){
            return ResponseEntity.ok("유효하지 않은 링크입니다.");
        }else {
            return ResponseEntity.ok().body(MessageUtils.success(dto).getDataBody());
        }
    }
}
