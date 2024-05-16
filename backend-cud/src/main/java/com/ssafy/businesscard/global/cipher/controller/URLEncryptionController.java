package com.ssafy.businesscard.global.cipher.controller;

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

    @GetMapping("/encrypt")
    public String encryptURL(@RequestParam String url) {
        try {
            return URLEncoder.encode(url, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "encoding 중 에러가 발생했습니다.";
        }

    }

    @GetMapping("/decrypt")
    public String decryptURL(@RequestParam String encryptedURL) {
        try {
            return URLDecoder.decode(encryptedURL, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "decoding 중 에러가 발생했습니다.";
        }
    }

}
