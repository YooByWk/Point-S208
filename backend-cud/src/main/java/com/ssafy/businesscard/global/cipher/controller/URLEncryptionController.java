package com.ssafy.businesscard.global.cipher.controller;

import com.ssafy.businesscard.global.cipher.dto.URLResponse;
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
    @GetMapping("/encode")
    public String encodeURL(@RequestParam String url) {
        try {
            // Extract the part after "https://"
            String urlToEncode = url.substring(url.indexOf("://") + 3);
            String encodedUrl = urlEncryptionService.encodeURL(urlToEncode);
            return "https://" + encodedUrl;
        } catch (Exception e) {
            e.printStackTrace();
            return "Encoding 중 에러가 발생했습니다.";
        }
    }

    @GetMapping("/decode")
    public String decodeURL(@RequestParam String encodedUrl) {
        try {
            // Extract the part after "http://"
            String urlToDecode = encodedUrl.substring(encodedUrl.indexOf("://") + 3);
            String decodedUrl = urlEncryptionService.decodeURL(urlToDecode);
            return "https://" + decodedUrl;
        } catch (Exception e) {
            e.printStackTrace();
            return "Decoding 중 에러가 발생했습니다.";
        }
    }

}
