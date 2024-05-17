package com.ssafy.businesscard.domain.user.entity;

import com.ssafy.businesscard.global.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;        //유저id

    @Column(nullable = false, length = 100)
    private String email; // 이메일, VARCHAR(100), NOT NULL

    @Column(nullable = false, length = 10)
    private String name; // 이름, VARCHAR(10), NOT NULL

}