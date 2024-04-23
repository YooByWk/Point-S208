package com.ssafy.backend.global.jwt.service;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;

@Getter
@Component
public class JwtUtils {

	public static final String BEARER_PREFIX = "Bearer ";
	public static final String KEY_ID = "id";
	public static final String KEY_EMAIL = "email";
	public static final String KEY_ROLE = "role";

	@Value("${jwt.secret}")
	private String secretKey;

	@Value("${jwt.expired-min.access}")
	private int accessTokenExpiredMin;

	@Value("${jwt.expired-min.refresh}")
	private int refreshTokenExpiredMin;

	private final Key encodedKey;

	public JwtUtils(@Value("${jwt.secret}") String secretKey,
					@Value("${jwt.expired-min.access}") int accessTokenExpiredMin,
					@Value("${jwt.expired-min.refresh}") int refreshTokenExpiredMin) {
		this.secretKey = secretKey;
		this.accessTokenExpiredMin = accessTokenExpiredMin;
		this.refreshTokenExpiredMin = refreshTokenExpiredMin;
		byte[] keyBytes = Decoders.BASE64.decode(secretKey);
		this.encodedKey = Keys.hmacShaKeyFor(keyBytes);
	}

}
