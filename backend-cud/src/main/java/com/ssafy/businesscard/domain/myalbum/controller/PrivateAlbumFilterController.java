package com.ssafy.businesscard.domain.myalbum.controller;

import com.ssafy.businesscard.domain.card.dto.request.FilterRequest;
import com.ssafy.businesscard.domain.myalbum.service.PrivateAlbumFilterService;
import com.ssafy.businesscard.global.utils.MessageUtils;
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

    // 필터 이름 편집
    @PatchMapping("/{userId}/filter/{filterId}")
    public ResponseEntity<MessageUtils> update(@PathVariable("userId") Long userId,
                                               @PathVariable("filterId") Long filterId,
                                               @RequestBody FilterRequest request) {
        privateAlbumFilterService.update(userId, filterId, request);
        log.info("Update Filter : {}", request.filterName());
        return ResponseEntity.ok().body(MessageUtils.success("필터가 수정되었습니다."));
    }

    // 필터 삭제
    @DeleteMapping("/{userId}/filter/{filterId}")
    public ResponseEntity<MessageUtils> delete(@PathVariable("userId") Long userId,
                                               @PathVariable("filterId") Long filterId) {
        privateAlbumFilterService.delete(userId, filterId);
        log.info("Delete Filter : {}", filterId);
        return ResponseEntity.ok().body(MessageUtils.success("필터가 삭제되었습니다."));
    }
}
