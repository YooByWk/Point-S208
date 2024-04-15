package com.ssafy.businesscard.security.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.io.Serializable;

@Getter
@AllArgsConstructor
@Builder
@RedisHash(value = "jwtToken", timeToLive = 7 * 24 * 60 * 60 * 1000)
public class Token implements Serializable {

    @Id
    private Long id;

    @Indexed
    private String refreshToken;
//    private String accessToken;
}
