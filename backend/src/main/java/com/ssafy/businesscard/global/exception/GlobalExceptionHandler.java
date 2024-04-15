package com.ssafy.businesscard.global.exception;

import com.ssafy.businesscard.global.utils.MessageUtils;
import com.ssafy.businesscard.security.exception.JwtException;
import com.ssafy.businesscard.user.exception.UserException;
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
    @ExceptionHandler(JwtException.class)
    public ResponseEntity<MessageUtils> jwtExceptionHandler(JwtException e){
        log.error(Arrays.toString(e.getStackTrace()));
        return ResponseEntity.status(e.getJwtErrorCode().getHttpStatus())
                .body(MessageUtils.fail(String.valueOf(e.getJwtErrorCode()),e.getMessage()));
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

}
