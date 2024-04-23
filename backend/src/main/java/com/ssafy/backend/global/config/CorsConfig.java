package com.ssafy.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*"); // 모든 ip에 응답을 허용하겠다.
		config.addAllowedHeader("*"); // 모든 header에 응답을 허용하겠다.
		config.addAllowedMethod("*"); // 모든 get, post, put, delete, patch 요청을 허용하겠다.
		config.addExposedHeader("Authorization");
		source.registerCorsConfiguration("/api/**", config);
		return new CorsFilter(source);
	}
}
