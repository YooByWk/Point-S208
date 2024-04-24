package com.ssafy.businesscard.mycard.service;

import com.ssafy.businesscard.mycard.dto.UserRequestDto;

public interface UserService {
    public long findUserId(UserRequestDto userRequestDto);
}
