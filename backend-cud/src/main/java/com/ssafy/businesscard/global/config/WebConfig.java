package com.ssafy.businesscard.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedOriginPatterns(String.valueOf(Arrays.asList("https://localhost:53000","https://teams.microsoft.com/v2/")))
                .allowCredentials(true)
//                .allowedOrigins("*")
                .allowedMethods("*");
    }
}
