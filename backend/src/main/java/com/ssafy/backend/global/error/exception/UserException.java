package com.ssafy.backend.global.error.exception;

import lombok.Getter;

@Getter
public class UserException extends RuntimeException {

	private final ExceptionType exceptionType;

	public UserException(ExceptionType exceptionType) {
		super(exceptionType.getErrorMessage());
		this.exceptionType = exceptionType;
	}

	public int getStatus() {
		return this.exceptionType.getHttpStatus().value();
	}

}
