package com.ssafy.businesscard.user.controller;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.user.model.dto.request.UserRegisterRequest;
import com.ssafy.businesscard.user.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/users")
@Tag(name = "유저 기능 API", description = "유저와 관련된 기능 제공")

public class UserController {
    private final MemberService userService;
    private final WebClientConfig webclientConfig;

    @PostMapping("/register")
    @Operation(summary = "유저 회원가입", description = "이메일, 비밀번호, 닉네임을 입력받아 회원가입을 진행한다")
    public ResponseEntity<MessageUtils> register(@Valid @RequestBody UserRegisterRequest userRegisterRequest) {
        userService.registUser(userRegisterRequest);
        log.info("[New User]: {}", userRegisterRequest.toString());
        return ResponseEntity.ok().body(MessageUtils.success());
    }

    @GetMapping("/info")
    @Operation(summary = "유저정보조회", description = "현재 로그인 중인 유저의 상세 정보를 조회한다 <br> [헤더 Bearer: Access토큰 필요] <br> 토큰을 통해 유저정보를 조회한다")
    public ResponseEntity<MessageUtils> getUserInfo() {
        return ResponseEntity.ok().body(MessageUtils.success(userService.getUserInfo()));
    }

//
//    @GetMapping("/info/{userid}")
//    @Operation(summary = "유저정보조회", description = "user id로   유저의 상세 정보를 조회한다 <br> [헤더 Bearer: Access토큰 필요] <br> 토큰을 통해 유저정보를 조회한다")
//    public ResponseEntity<MessageUtils> getUserInfobyid(@PathVariable Long userid) {
//        return ResponseEntity.ok().body(MessageUtils.success(userService.getUserInfobyid(userid)));
//
//    }
//    @PatchMapping("")
//    @Operation(summary = "유저 정보 수정", description = "유저의 정보를 수정한다 <br> 현재는 닉네임만 ")
//    public ResponseEntity<MessageUtils> updateUserInfo(@RequestBody @Valid UserUpdateRequest userUpdateRequest) {
//        userService.updateCurrentUserInfo(userUpdateRequest);
//        return ResponseEntity.ok().body(MessageUtils.success());
//    }

//    @GetMapping("/user")
//    public String getUserDetails(@RegisteredOAuth2AuthorizedClient("microsoft") OAuth2AuthorizedClient authorizedClient) {
//        String userInfoEndpointUri = authorizedClient.getClientRegistration()
//                .getProviderDetails().getUserInfoEndpoint().getUri();
//
//        if (!userInfoEndpointUri.isEmpty()) {
//            String response = webclientConfig.webClientBuilder()
//                    .get()
//                    .uri(userInfoEndpointUri)
//                    .attributes(oauth2AuthorizedClient(authorizedClient))
//                    .retrieve()
//                    .bodyToMono(String.class)
//                    .block();
//            return "User Info: " + response;
//        }
//
//        return "User Info Endpoint not configured";
//    }

}
