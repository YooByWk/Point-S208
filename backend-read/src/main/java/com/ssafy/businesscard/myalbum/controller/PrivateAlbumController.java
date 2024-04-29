package com.ssafy.businesscard.myalbum.controller;

import com.ssafy.businesscard.myalbum.service.MyalbumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PrivateAlbumController {

    private MyalbumService myalbumService;

    //명함지갑에서목록조회


}
