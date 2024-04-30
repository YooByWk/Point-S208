package com.ssafy.businesscard.domain.user.service;

import com.ssafy.businesscard.domain.user.dto.UserRequestDto;

public interface UserService {
    public long findUserId(UserRequestDto userRequestDto);
}
