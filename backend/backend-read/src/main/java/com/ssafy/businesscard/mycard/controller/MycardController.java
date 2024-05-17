package com.ssafy.businesscard.mycard.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.mycard.dto.MycardListResponseDto;
import com.ssafy.businesscard.mycard.service.MycardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MycardController {
    

    private final MycardService mycardService;

    //내카드 조회
    @GetMapping("/my-card/{user_id}")
    public ResponseEntity<MycardListResponseDto> getMycard(@PathVariable("user_id")Long userId){
        MycardListResponseDto list =mycardService.getMycard(userId);
        return ResponseEntity.ok().body(MessageUtils.success(list).getDataBody());
    }
}
