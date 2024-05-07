package com.ssafy.businesscard.privateAlbum.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.privateAlbum.dto.FilterCardResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.FilterListResponseDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumListDto;
import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.service.PrivateAlbumService;
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
public class PrivateAlbumController {

    private final PrivateAlbumService privateAlbumService;

    //명함지갑에서목록조회
    @GetMapping("/my-album/list/{user_id}/{page}")
    public ResponseEntity<?> getAlbumList(
            @PathVariable("user_id")Long userId,
            @PathVariable("page")int page){

        List<PrivateAlbumResponseDto> list = privateAlbumService.getAlbumList(userId, page);
        return ResponseEntity.ok().body(MessageUtils.success(list));
    }

    //명함 상세 조회
    @GetMapping("/my-album/{user_id}/{card_id}")
    public ResponseEntity<?> getAlbumDtail(
            @PathVariable("user_id")Long userId,
            @PathVariable("card_id")Long cardId){
        PrivateAlbumResponseDto privateAlbumResponseDto = privateAlbumService.getAlbumDtail(userId, cardId);
        return ResponseEntity.ok().body(MessageUtils.success(privateAlbumResponseDto));
    }

    //필터 목록 조회
    @GetMapping("/my-album/{user_id}/filter")
    public ResponseEntity<?> getFilter(@PathVariable("user_id")Long userId){
        List<FilterListResponseDto> list = privateAlbumService.getFilter(userId);
        return ResponseEntity.ok().body(MessageUtils.success(list));
    }

    //필터별 명함 조회
    @GetMapping("/my-album/{user_id}/filter/{filter_id}")
    public ResponseEntity<?> getFilterCard(@PathVariable("user_id")Long userId, @PathVariable("filter_id")Long filterId){
        FilterCardResponseDto filterCardResponseDto = privateAlbumService.getFilterCard(userId, filterId);
        return ResponseEntity.ok().body(MessageUtils.success(filterCardResponseDto));
    }

    //상세보기에서 명함마다 필터 뭐있는지 조회
    @GetMapping("/my-album/{user_id}/{card_id}/filter")
    public ResponseEntity<?> getAlbumDtailFilter(
            @PathVariable("user_id")Long userId,
            @PathVariable("card_id")Long cardId){
        List<FilterListResponseDto> list = privateAlbumService.getAlbumDtailFilter(userId, cardId);
        return ResponseEntity.ok().body(MessageUtils.success(list));
    }


    //엑셀로 내보내기용 명함지갑목록조회
    @GetMapping("/my-album/list/{user_id}")
    public ResponseEntity<?> getAlbumAllList(@PathVariable("user_id")Long userId){
        List<PrivateAlbumResponseDto> list = privateAlbumService.getAlbumAllList(userId);
        return ResponseEntity.ok().body(MessageUtils.success(list));
    }
}
