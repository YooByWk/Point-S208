package com.ssafy.businesscard.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum UserErrorCode {
    NOT_EXISTS_USER("존재하지 않는 회원입니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN_EMAIL("이미 가입된 회원입니다.", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED("권한이 없습니다.", HttpStatus.FORBIDDEN),

    NOT_EXISTS_CARD("존재하지 않는 명함입니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN_CARD("이미 등록된 명함입니다.", HttpStatus.BAD_REQUEST),
    NOT_EXISTS_FILTER("존재하는 않는 필터 입니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN_FILTER("이미 존재하는 필터입니다.", HttpStatus.BAD_REQUEST),
    INVALID_FILTER_NAME("유효하지 않는 이름입니다.", HttpStatus.BAD_REQUEST),
    NOT_EXITSTS_TEAM("존재하지 않는 팀 입니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN_TEAM("이미 존재하는 팀입니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN_TEAMMEMBER("이미 추가된 회원입니다.", HttpStatus.BAD_REQUEST),
    BAD_REQUEST("잘못된 요청입니다.", HttpStatus.BAD_REQUEST)
    ;

    private final String message;
    private final HttpStatus httpStatus;
}
