package com.ssafy.businesscard.domain.user.service;

import com.ssafy.businesscard.domain.user.repository.UserRepository;
import com.ssafy.businesscard.domain.user.dto.UserRequestDto;
import com.ssafy.businesscard.domain.user.entity.User;
import com.ssafy.businesscard.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserMapper userMapper;


    /**
     *userId return을 위한 tutorial
     */
    public long findUserId(UserRequestDto userRequestDto) {
        Long userId = userRepository.findUserIdByNameAndEmail(userRequestDto.name(), userRequestDto.email());
        if(userId != null){
            return userId;
        }else{

            User user = User.builder()
                    .name(userRequestDto.name())
                    .email(userRequestDto.email())
                    .build();
            User saveUser = userRepository.save(user);
            return saveUser.getUserId();
        }
    }
}
