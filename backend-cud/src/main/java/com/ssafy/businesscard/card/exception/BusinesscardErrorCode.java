package com.ssafy.businesscard.card.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BusinesscardErrorCode {
    NOT_EXISTS_CARD("존재하지 않는 명함입니다.", HttpStatus.BAD_REQUEST),
    ALREADY_IN_CARD("이미 등록된 명함입니다.", HttpStatus.BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}
