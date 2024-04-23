package com.ssafy.backend.global.jwt.service;

import com.ssafy.backend.domain.user.dto.LoginUserDto;
import com.ssafy.backend.global.jwt.dto.TokenDto;
import com.ssafy.backend.global.jwt.dto.UserInfoDto;
import lombok.NonNull;

public interface JwtService {

	String issueAccessToken(@NonNull UserInfoDto info);

	String issueRefreshToken(Long id);

	TokenDto issueToken(@NonNull UserInfoDto info);

	LoginUserDto parseAccessToken(String accessToken);

	Long parseRefreshToken(String refreshToken);

	void addBlackList(@NonNull String accessToken);

	boolean isBlack(String jwt);

}
