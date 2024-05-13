package com.ssafy.businesscard.domain.user.service;

import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.domain.user.dto.UserRequestDto;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.global.exception.UserErrorCode;
import com.ssafy.businesscard.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /**
     * userId return을 위한 tutorial
     */
    public long findUserId(UserRequestDto userRequestDto) {
        Long userId = userRepository.findUserIdByNameAndEmail(userRequestDto.name(), userRequestDto.email());
        if (userId != null) {
            return userId;
        } else {

            User user = User.builder()
                    .name(userRequestDto.name())
                    .email(userRequestDto.email())
                    .build();
            User saveUser = userRepository.save(user);
            return saveUser.getUserId();
        }
    }
    @Override
    public User findUserById(Long userid) {
        return userRepository.findById(userid).orElseThrow(() ->
                new UserException(UserErrorCode.NOT_EXISTS_USER));

    }
}
