package com.ssafy.businesscard.user.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum UserErrorCode {
    NOT_EXISTS_USER("존재하지 않는 회원입니다.",HttpStatus.BAD_REQUEST),
    ALREADY_IN_EMAIL("이미 가입된 회원입니다.", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED("권한이 없습니다.", HttpStatus.FORBIDDEN);

    private final String message;
    private final HttpStatus httpStatus;
}
