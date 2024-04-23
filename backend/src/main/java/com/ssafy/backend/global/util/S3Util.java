package com.ssafy.backend.global.util;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.FileException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.UUID;

@Service
public class S3Util {

	@Value("${cloud.aws.s3.bucket}")
	String bucket;

	@Autowired
	private AmazonS3Client amazonS3Client;

	// 폴더 생성
	public void createFolder(String bucketName, String folderName) {
		amazonS3Client.putObject(bucketName, folderName + "/", new ByteArrayInputStream(new byte[0]), new ObjectMetadata());
	}

	// 파일 업로드
	public String fileUpload(String folderName, MultipartFile file) throws Exception {
		if (amazonS3Client != null) {

			if (!file.isEmpty()) {
				createFolder(bucket, folderName);
			}
			UUID uuid = UUID.randomUUID();
			ObjectMetadata objectMetadata = getObjectMetadata(file);
			objectMetadata.setHeader("filename", uuid);
			amazonS3Client.putObject(new PutObjectRequest(bucket + "/" + folderName, uuid.toString(), file.getInputStream(), objectMetadata));
			return uuid.toString();
		} else {
			throw new FileException(ExceptionType.AWS_UPLOAD_FAIL);
		}
	}

	private static ObjectMetadata getObjectMetadata(MultipartFile file) {
		ObjectMetadata objectMetadata = new ObjectMetadata();
		String fileName = file.getOriginalFilename();
		String extension = "";
		assert fileName != null;
		if (fileName.contains("jpg") || fileName.contains("jpeg")) {
			extension = "image/jpeg";
		} else if (fileName.contains("png")) {
			extension = "image/png";
		} else if (fileName.contains("gif")) {
			extension = "image/gif";
		} else {
			throw new FileException(ExceptionType.NOT_IMAGE_FILE);
		}
		objectMetadata.setContentType(extension);
		objectMetadata.setContentLength(file.getSize());
		return objectMetadata;
	}

	// 파일 삭제
	public void bucketDelete(String folderName, String fileName) {
		if (amazonS3Client != null) {
			amazonS3Client.deleteObject(bucket + "/" + folderName, fileName);
		} else {
			throw new FileException(ExceptionType.AWS_DELETE_FAIL);
		}
	}

}
