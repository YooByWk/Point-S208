package com.ssafy.businesscard.domain.user.controller;
import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.domain.user.dto.UserRequestDto;
import com.ssafy.businesscard.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //튜토리얼
    @PostMapping("/tutorial")
    public ResponseEntity<?> tutorial(@RequestBody UserRequestDto userRequestDto){
        Long userId = userService.findUserId(userRequestDto);
        return ResponseEntity.ok().body(MessageUtils.success(userId));
    }

    //내 명함 조회
    @GetMapping("/my-card/{user_id}")
    public ResponseEntity<?> mycard(@PathVariable("user_id")Long userId){

        return ResponseEntity.ok().body(MessageUtils.success());
    }

}

