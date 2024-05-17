package com.ssafy.businesscard.global.cipher.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Slf4j
@Service
public class URLEncryptionService {
    // URL을 인코딩하고 Base64로 인코딩
    public String encodeURL(String url) throws Exception {
        String urlEncoded = URLEncoder.encode(url, StandardCharsets.UTF_8.toString());
        return Base64.getEncoder().encodeToString(urlEncoded.getBytes(StandardCharsets.UTF_8));
    }

    // Base64로 인코딩된 URL을 디코딩하고 URL 디코딩
    public String decodeURL(String encodedUrl) throws Exception {
        byte[] decodedBytes = Base64.getDecoder().decode(encodedUrl);
        String urlDecoded = new String(decodedBytes, StandardCharsets.UTF_8);
        return URLDecoder.decode(urlDecoded, StandardCharsets.UTF_8.toString());
    }
}
