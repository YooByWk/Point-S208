package com.ssafy.businesscard.user.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.user.dto.UserRequestDto;
import com.ssafy.businesscard.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}
