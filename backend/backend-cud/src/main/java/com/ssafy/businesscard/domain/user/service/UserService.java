package com.ssafy.businesscard.domain.user.service;

import com.ssafy.businesscard.domain.user.dto.UserRequestDto;
import com.ssafy.businesscard.domain.user.entity.User;

public interface UserService {
    public long findUserId(UserRequestDto userRequestDto);
    public User findUserById(Long userid);
}
