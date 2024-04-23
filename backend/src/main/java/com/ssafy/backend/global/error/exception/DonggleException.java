package com.ssafy.backend.global.error.exception;

import lombok.Getter;

@Getter
public class DonggleException extends RuntimeException {

	private final ExceptionType exceptionType;

	public DonggleException(ExceptionType exceptionType) {
		super(exceptionType.getErrorMessage());
		this.exceptionType = exceptionType;
	}

	public int getStatus() {
		return this.exceptionType.getHttpStatus().value();
	}

}
