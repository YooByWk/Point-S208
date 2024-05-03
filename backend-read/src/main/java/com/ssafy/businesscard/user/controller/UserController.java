package com.ssafy.businesscard.user.controller;

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
}
