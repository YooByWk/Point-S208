//package com.ssafy.businesscard.security.controller;
//
//import com.ssafy.businesscard.security.service.TokenService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.client.RestTemplate;
//
//
//@RestController
//@CrossOrigin("*")
//@Slf4j
//@RequiredArgsConstructor
//public class OAuthController {
//    @Value("${spring.security.oauth2.client.registration.google.client-id}")
//    private String googleClientId;
//    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
//    private String googleClientsecret;
//
//    private final TokenService tokenService;
//
//    private final RestTemplate restTemplate;
//
//
//    @PostMapping(value = "/api/v1/oauth2/google")
//    public String loginUrlGoogle() {
//        String reqUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=" + googleClientId
//                + "&redirect_uri=http://localhost:8080/api/v1/oauth2/google&response_type=code&scope=email%20profile%20openid&access_type=offline";
//        log.info("urlll" + reqUrl);
//        return reqUrl;
//    }
//
//
//    @GetMapping("/api/v1/oauth2/google")
//    public String requestAccessToken(@RequestParam("code") String authCode) {
//        // 액세스 토큰 요청을 위한 파라미터 설정
//        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
//        log.info("secret"+googleClientsecret);
//        log.info("authCodess"+authCode);
//        requestBody.add("code", authCode);
//        requestBody.add("client_id", googleClientId);
//        requestBody.add("client_secret", googleClientsecret);
//        requestBody.add("redirect_uri", "http://localhost:8080/api/v1/oauth2/google");
//        requestBody.add("grant_type", "authorization_code");
//
//        // 액세스 토큰 요청
//        ResponseEntity<AccessTokenResponse> response = restTemplate.postForEntity(
//                "https://oauth2.googleapis.com/token",
//                requestBody,
//                AccessTokenResponse.class
//        );
//
//        // 요청 결과에서 액세스 토큰 추출
//        AccessTokenResponse accessTokenResponse = response.getBody();
//        String accessToken = accessTokenResponse.getAccessToken();
//
//        return accessToken;
//    }
//
//
////
////    @GetMapping("/api/v1/oauth2/google")
////    public String loginGoogle(@RequestParam(value = "code") String authCode) { //인가코드를 바탕으로 email 받는로직
////
////        RestTemplate restTemplate = new RestTemplate();
////        GoogleRequest googleOAuthRequestParam = GoogleRequest
////                .builder()
////                .clientId(googleClientId)
////                .clientSecret(googleClientsecret)
////                .code(authCode)
////                .redirectUri("http://localhost:8080/api/v1/oauth2/google")
////                .grantType("authorization_code").build();
////
////        ResponseEntity<GoogleResponse> resultEntity = restTemplate.postForEntity("https://oauth2.googleapis.com/token",
////                googleOAuthRequestParam, GoogleResponse.class);
////
////        String jwtToken = resultEntity.getBody().getId_token();
////        Map<String, String> map = new HashMap<>();
////        map.put("id_token", jwtToken);
////
////        ResponseEntity<GoogleInfoResponse> resultEntity2 = restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo",
////                map, GoogleInfoResponse.class);
////
////        String email = resultEntity2.getBody().getEmail();
//////        tokenService.issueToken(email);
////
////        return email;
////
////    }
//
//
//}