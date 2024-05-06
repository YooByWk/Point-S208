package com.ssafy.businesscard.global.exception;

import com.ssafy.businesscard.global.utils.MessageUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<MessageUtils> handleResponseStatusException(ResponseStatusException e) {
        log.error("ResponseStatusException: {}", e.getMessage());
        return ResponseEntity
                .status(e.getStatusCode())
                .body(MessageUtils.fail(String.valueOf(e.getStatusCode().value()), e.getReason()));
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity userExceptionHandler(UserException e){
        log.error(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(e.getUserErrorCode().getHttpStatus())
                .body(MessageUtils.fail(String.valueOf(e.getUserErrorCode()),e.getMessage()));
    }
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<MessageUtils> validException(MethodArgumentNotValidException exception) {
        BindingResult bindingResult = exception.getBindingResult();

        StringBuilder errorMessages = new StringBuilder();
        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            errorMessages.append("[");
            errorMessages.append(fieldError.getField());
            errorMessages.append("](은)는 ");
            errorMessages.append(fieldError.getDefaultMessage());
            errorMessages.append("\n");
        }
        log.error(errorMessages.toString());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(MessageUtils.fail(HttpStatus.BAD_REQUEST.name(),errorMessages.toString()));
    }

    @Getter
    public static class UserException extends RuntimeException{
        private final UserErrorCode userErrorCode;

        public UserException(UserErrorCode userErrorCode) {
            super(userErrorCode.getMessage());
            this.userErrorCode = userErrorCode;
        }
    }

    @Getter
    @AllArgsConstructor
    public enum UserErrorCode {
        NOT_EXISTS_USER("존재하지 않는 회원입니다.",HttpStatus.BAD_REQUEST),
        ALREADY_IN_EMAIL("이미 가입된 회원입니다.", HttpStatus.BAD_REQUEST),
        ACCESS_DENIED("권한이 없습니다.", HttpStatus.FORBIDDEN),

        NOT_EXISTS_CARD("존재하지 않는 명함입니다.", HttpStatus.BAD_REQUEST),
        ALREADY_IN_CARD("이미 등록된 명함입니다.", HttpStatus.BAD_REQUEST),
        NOT_EXISTS_FILTER("존재하는 않는 필터 입니다.", HttpStatus.BAD_REQUEST),
        NOT_EXITSTS_TEAM("존재하지 않는 팀 입니다.", HttpStatus.BAD_REQUEST);

        private final String message;
        private final HttpStatus httpStatus;
    }
}
