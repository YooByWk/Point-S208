package com.ssafy.backend.domain.user.mapper;


import com.ssafy.backend.domain.user.dto.request.SignupRequestDto;
import com.ssafy.backend.domain.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
	User toUser(SignupRequestDto signupRequestDto);
}
