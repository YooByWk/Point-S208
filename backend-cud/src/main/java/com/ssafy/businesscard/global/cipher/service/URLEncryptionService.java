package com.ssafy.businesscard.global.cipher.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
public class URLEncryptionService {

    // 암호화
    public String encryptURL(String url) {
        log.info("[입력받은 url] : {}", url);
        try {
            Map<String, String> queryParams  = extractQueryParams(url);
            log.info("[queryParams] : {}", queryParams);

            String email = queryParams.get("email");
            log.info("[email] : {}", email);
            String appId = queryParams.get("appId");
            log.info("[appId] : {}", appId);
            String baseURL = queryParams.get("baseUrl");
            log.info("[baseURL] : {}", baseURL);

            String encodedEmail = URLEncoder.encode(email, "UTF-8");
            log.info("[encodedEmail] : {}", encodedEmail);
            String encodedAppId = URLEncoder.encode(appId, "UTF-8");
            log.info("[encodedAppId] : {}", encodedAppId);

            String encodedURL = buildURL(baseURL, encodedEmail, encodedAppId);
            log.info("[encodedURL] : {}", encodedURL);
            return encodedURL;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "encoding 중 에러가 발생했습니다.";
        }
    }

    // URL에서 email과 appId 추출
    private Map<String, String> extractQueryParams(String url) {
        Map<String, String> queryParams = new HashMap<>();
        String[] parts = url.split("\\?");
        if (parts.length > 1) {
            String[] query = parts[1].split("&");
            for (String param : query) {
                String[] keyValue = param.split("=");
                queryParams.put(keyValue[0], keyValue[1]);
            }
        }
        return queryParams;
    }
    
    // 인코딩된 email과 appId를 추가하여 최종 인코딩된 URL 생성
    private String buildURL(String baseURL, String encodedEmail, String encodedAppId) {
        StringBuilder encodedURL = new StringBuilder();
        encodedURL.append(baseURL).append("?email=").append(encodedEmail).append("&appId=").append(encodedAppId);
        return encodedURL.toString();
    }

    // 복호화
    public String decryptURL(String encryptedUrl) {
        try {
            return URLDecoder.decode(encryptedUrl, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return "decoding 중 에러가 발생하였습니다.";
        }
    }
}
