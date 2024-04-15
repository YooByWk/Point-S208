package com.ssafy.businesscard.security.exception;

import lombok.Getter;

@Getter
public class JwtException extends RuntimeException{
    private final JwtErrorCode jwtErrorCode;
    public JwtException(JwtErrorCode jwtErrorCode, String e){
        super(e);
        this.jwtErrorCode=jwtErrorCode;
    }
    public JwtException(JwtErrorCode jwtErrorCode){
        super(jwtErrorCode.getMessage());
        this.jwtErrorCode=jwtErrorCode;
    }
}
