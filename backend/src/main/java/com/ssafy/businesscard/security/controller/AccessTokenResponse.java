package com.ssafy.businesscard.security.controller;

import lombok.Data;

@Data
public class AccessTokenResponse {
    private String accessToken;
    private String tokenType;
    private Integer expiresIn;
    private String refreshToken;
    private String idToken;
}
