package com.ssafy.businesscard.global.exception;


import com.ssafy.businesscard.global.exception.UserErrorCode;
import lombok.Getter;

@Getter
public class UserException extends RuntimeException{
    private final UserErrorCode userErrorCode;

    public UserException(UserErrorCode userErrorCode) {
        super(userErrorCode.getMessage());
        this.userErrorCode = userErrorCode;
    }
}
