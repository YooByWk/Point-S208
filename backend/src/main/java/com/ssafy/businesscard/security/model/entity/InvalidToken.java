package com.ssafy.businesscard.security.model.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@Builder
@RedisHash(value = "blackList", timeToLive = 1 * 60 * 60 * 1000)
public class InvalidToken {
    @Id
    private String accessToken;

}
