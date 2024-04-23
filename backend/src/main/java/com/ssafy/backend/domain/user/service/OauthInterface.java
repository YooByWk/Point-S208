package com.ssafy.backend.domain.user.service;

import java.util.Map;

public interface OauthInterface {
	Map<String, Object> getUserInfo(String provider, String token);
}
