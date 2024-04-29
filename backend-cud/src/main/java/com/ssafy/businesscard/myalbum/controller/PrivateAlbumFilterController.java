package com.ssafy.businesscard.myalbum.controller;

import com.ssafy.businesscard.myalbum.service.PrivateAlbumFilterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-album")
public class PrivateAlbumFilterController {
    private final PrivateAlbumFilterService privateAlbumFilterService;
}
