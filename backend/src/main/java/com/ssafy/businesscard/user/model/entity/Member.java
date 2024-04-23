package com.ssafy.businesscard.user.model.entity;

import com.ssafy.businesscard.user.model.dto.response.UserResponse;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.Collection;


@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 만들어줌
@DynamicUpdate //update 할때 실제 값이 변경됨 컬럼으로만 update 쿼리를 만듬
@Entity //JPA Entity 임을 명시
@Getter //Lombok 어노테이션으로 getter
@Table(name = "member") //테이블 관련 설정 어노테이션
@Builder
@Setter
@AllArgsConstructor
public class Member   {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Column(name = "nickname", unique = true)
    private String nickname;


    public Member update(String name, String email) {
        this.name = name;
        this.email = email;
        return this;
    }

    public UserResponse toUserResponse(Member member) {
        return UserResponse.builder()
                .authProvider(member.provider)
                .id(member.getId())
                .nickname(member.getNickname())
                .name(member.getName())
                .email(member.getEmail())
                .build();
    }

}