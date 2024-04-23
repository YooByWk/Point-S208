package com.ssafy.backend.domain.user.service.impl;

import com.ssafy.backend.domain.education.dto.UserEducationDto;
import com.ssafy.backend.domain.education.entity.ActionLearning;
import com.ssafy.backend.domain.education.entity.Education;
import com.ssafy.backend.domain.education.repository.actionLearning.ActionLearningRepository;
import com.ssafy.backend.domain.education.repository.education.EducationRepository;
import com.ssafy.backend.domain.user.dto.request.PasswordRequestDto;
import com.ssafy.backend.domain.user.dto.response.UserResponseDto;
import com.ssafy.backend.domain.user.entity.User;
import com.ssafy.backend.domain.user.repository.UserRepository;
import com.ssafy.backend.domain.user.service.UserService;
import com.ssafy.backend.global.error.exception.ExceptionType;
import com.ssafy.backend.global.error.exception.FileException;
import com.ssafy.backend.global.error.exception.UserException;
import com.ssafy.backend.global.util.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.backend.global.error.exception.ExceptionType.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final EducationRepository educationRepository;
	private final ActionLearningRepository actionLearningRepository;
	private final PasswordEncoder passwordEncoder;
	private final S3Util s3Util;

	@Override
	@Transactional
	public void updatePassword(User user, String password) {
		user.updatePassword(passwordEncoder.encode(password));
		userRepository.save(user);
	}

	@Override
	@Transactional
	public void changePassword(Long userId, PasswordRequestDto passwordRequestDto) {
		User user = getUserById(userId);
		if (!isPasswordCorrect(passwordRequestDto, user)) {
			throw new UserException(INVALID_PASSWORD);
		}
		updatePassword(user, passwordRequestDto.newPassword());
	}

	@Override
	public void changeNickname(Long userId, String nickname) {
		User user = getUserById(userId);
		user.updateNickname(nickname);
		userRepository.save(user);
	}

	@Override
	@Transactional
	public void saveEducationImage(Long userId, Long educationId, MultipartFile userActionImage) {
		String folderName = "word/user/" + userId + "/" + educationId;
		User user = getUserById(userId);
		Education education = educationRepository.findById(educationId).orElseThrow(() -> new UserException(INVALID_USER));
		String imagePath = uploadImage(userActionImage, folderName);
		actionLearningRepository.save(ActionLearning.builder()
				.education(education)
				.user(user)
				.userPath(imagePath)
				.build());
	}

	@Override
	public List<UserEducationDto> getEducationsByUser(Long userId) {
		return educationRepository.findEducationByUser(userId);
	}


	@Override
	@Transactional
	public String updateProfileImage(Long userId, MultipartFile profileImage) {
		String folderName = "userprofile/" + userId;
		User user = getUserById(userId);
		s3Util.bucketDelete(folderName, user.getProfileImage().replace(folderName + "/", ""));
		String imagePath = uploadImage(profileImage, folderName);
		user.updateProfileImage(imagePath);
		userRepository.save(user);
		return imagePath;

	}

	@Override
	public UserResponseDto getUserInfo(Long userId) {
		User user = getUserById(userId);
		return UserResponseDto.from(user);
	}

	@Override
	public UserResponseDto getUserInfo(String email) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> new UserException(INVALID_USER));
		return UserResponseDto.from(user);
	}

	@Override
	@Transactional
	public void updateStatus(Long userId) {
		User user = getUserById(userId);
		user.updateStatus(User.Status.WITHDRAWAL);
		userRepository.save(user);
	}

	private String uploadToS3(MultipartFile image, String folderName) {
		try {
			return s3Util.fileUpload(folderName, image);
		} catch (Exception e) {
			throw new UserException(ExceptionType.AWS_UPLOAD_FAIL);
		}
	}

	private User getUserById(Long userId) {
		return userRepository.findById(userId).orElseThrow(() -> new UserException(INVALID_USER));
	}

	private boolean isPasswordCorrect(PasswordRequestDto passwordRequestDto, User user) {
		return passwordEncoder.matches(passwordRequestDto.currentPassword(), user.getPassword());
	}

	private String uploadImage(MultipartFile imageFile, String folderName) {
		if (!imageFile.isEmpty()) {
			String imagePath;
			String fileName = uploadToS3(imageFile, folderName);
			imagePath = folderName + "/" + fileName;
			return imagePath;
		}
		throw new FileException(INVALID_FILE);
	}
}
