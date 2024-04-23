package com.ssafy.businesscard.user.exception;


import lombok.Getter;

@Getter
public class UserException extends RuntimeException{
    private final UserErrorCode userErrorCode;

    public UserException(UserErrorCode userErrorCode) {
        super(userErrorCode.getMessage());
        this.userErrorCode = userErrorCode;
    }
}
