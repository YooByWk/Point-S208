package com.ssafy.businesscard.global.s3.controller;

import com.ssafy.businesscard.global.s3.model.entity.response.S3ManyFilesResponse;
import com.ssafy.businesscard.global.s3.servcie.AmazonS3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/file")
public class AmazonS3Controller {
    private final AmazonS3Service amazonS3Service;

    @PostMapping("/uploadFile")
    public ResponseEntity<S3ManyFilesResponse> uploadFile(List<MultipartFile> multipartFiles){
        return ResponseEntity.ok(amazonS3Service.uploadFiles(multipartFiles));
    }

    @DeleteMapping("/deleteFile")
    public ResponseEntity<String> deleteFile(@RequestParam String fileName){
        amazonS3Service.deleteFile(fileName);
        return ResponseEntity.ok(fileName);
    }
}
