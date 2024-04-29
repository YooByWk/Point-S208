package com.ssafy.businesscard.privateAlbum.controller;

import com.ssafy.businesscard.privateAlbum.service.PrivateAlbumService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PrivateAlbumController {

    private PrivateAlbumService privateAlbumService;

    //명함지갑에서목록조회


}
