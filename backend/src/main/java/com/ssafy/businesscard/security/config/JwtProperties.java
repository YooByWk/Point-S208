package com.ssafy.businesscard.security.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "spring.jwt") // spring.jwt.xxx 로 바인딩
public class JwtProperties {
    // JWT 설정을 외부에서 읽어오기 위한 클래스

    private String access;  // spring.jwt.access
    private String refresh;
    private Long accesstime;
    private Long refreshtime;
}
