package com.ssafy.businesscard.global.s3.exception;

import lombok.Getter;

@Getter
public class S3Exception extends RuntimeException{
    private final S3ErrorCode s3ErrorCode;


    public S3Exception(S3ErrorCode s3ErrorCode) {
        super(s3ErrorCode.getMessage());
        this.s3ErrorCode = s3ErrorCode;
    }
}