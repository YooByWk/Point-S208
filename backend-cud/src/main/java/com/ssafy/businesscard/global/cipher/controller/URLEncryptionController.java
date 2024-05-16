package com.ssafy.businesscard.global.cipher.controller;

import com.ssafy.businesscard.global.cipher.service.URLEncryptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class URLEncryptionController {
    private final URLEncryptionService urlEncryptionService;
    @GetMapping("/encrypt")
    public String encryptURL(@RequestParam String url) {
        return urlEncryptionService.encryptURL(url);
    }

    @GetMapping("/decrypt")
    public String decryptURL(@RequestParam String encryptedURL) {
        return urlEncryptionService.decryptURL(encryptedURL);
    }

}
