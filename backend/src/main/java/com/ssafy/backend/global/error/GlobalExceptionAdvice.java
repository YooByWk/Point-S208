package com.ssafy.backend.global.error;

import com.ssafy.backend.global.dto.ErrorResponse;
import com.ssafy.backend.global.error.exception.DonggleException;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.FileException;
import com.ssafy.backend.global.error.exception.UserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import static com.ssafy.backend.global.error.exception.ExceptionType.AUTHENTICATION_EXCEPTION;
import static com.ssafy.backend.global.error.exception.ExceptionType.FORBIDDEN_EXCEPTION;

@RestControllerAdvice
public class GlobalExceptionAdvice {

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity accessDeniedExceptionHandler(AccessDeniedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(ErrorResponse.fail(HttpStatus.FORBIDDEN.name(), FORBIDDEN_EXCEPTION.getErrorMessage()));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity authenticationExceptionHandler(AuthenticationException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ErrorResponse.fail(HttpStatus.UNAUTHORIZED.name(), AUTHENTICATION_EXCEPTION.getErrorMessage()));
    }

    @ExceptionHandler({UserException.class})
    public ResponseEntity userExceptionHandler(UserException ex) {
        return getErrorResponse(ex.getExceptionType());
    }

    @ExceptionHandler({FileException.class})
    public ResponseEntity fileExceptionHandler(FileException ex) {
        return getErrorResponse(ex.getExceptionType());
    }

    @ExceptionHandler({DonggleException.class})
    public ResponseEntity donggleExceptionHandler(DonggleException ex) {
        return getErrorResponse(ex.getExceptionType());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity methodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest()
                .body(ErrorResponse.fail(HttpStatus.BAD_REQUEST.name(), "잘못된 요청입니다."));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity handleDefaultExcpeiton(Exception ex) {
        String message = ex.getMessage();
        System.out.println(message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponse.fail(HttpStatus.BAD_REQUEST.name(), "에러가 발생했습니다."));
    }

    private static ResponseEntity<ErrorResponse<Object>> getErrorResponse(ExceptionType ex) {
		return ResponseEntity.status(ex.getHttpStatus())
                .body(ErrorResponse.fail(ex.name(), ex.getErrorMessage()));
    }
}
