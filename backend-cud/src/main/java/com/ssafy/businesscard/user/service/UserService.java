package com.ssafy.businesscard.user.service;

import com.ssafy.businesscard.user.dto.UserRequestDto;

public interface UserService {
    public long findUserId(UserRequestDto userRequestDto);
}
