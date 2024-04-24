package com.ssafy.businesscard.user.model.entity;

import com.ssafy.businesscard.user.model.dto.response.UserResponse;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;


@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Table(name = "user") //테이블 관련 설정 어노테이션
@Builder
@Setter
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name", nullable = false, length = 10)
    private String name;

    @Column(name = "email", unique = true, nullable = false, length = 100)
    private String email;

    public User update(String name, String email) {
        this.name = name;
        this.email = email;
        return this;
    }

    public UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

}