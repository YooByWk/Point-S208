package com.ssafy.businesscard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BusinesscardApplication {

    public static void main(String[] args) {
        SpringApplication.run(BusinesscardApplication.class, args);
    }

}
