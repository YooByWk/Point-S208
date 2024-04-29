package com.ssafy.businesscard.myalbum.controller;

import com.ssafy.businesscard.card.dto.request.FilterRequest;
import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.myalbum.service.PrivateAlbumFilterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-album")
public class PrivateAlbumFilterController {

    private final PrivateAlbumFilterService privateAlbumFilterService;

    // 필터 생성
    @PostMapping("/{userId}/filter")
    public ResponseEntity<MessageUtils> create(@PathVariable("userId") Long userId,
                                               @RequestBody FilterRequest request) {
        privateAlbumFilterService.create(userId, request);
        log.info("New Filter : {}", request.toString());
        return ResponseEntity.ok().body(MessageUtils.success("필터가 생성되었습니다."));
    }

    // 필터 수정

    // 필터 삭제
}
