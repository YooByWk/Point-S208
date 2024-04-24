package com.ssafy.businesscard.user.model.entity;

import com.ssafy.businesscard.user.model.dto.response.UserResponse;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfile {
    //    private String name;
    private String email;
    private String provider;
    private String nickname;
    private String role;


    public User toMember() {
        return User.builder()
                .name(nickname)
                .email(email)
                .build();
    }

    public UserResponse toUserReponse() {
        return UserResponse.builder()
//                .nickname(  name)
                .nickname(nickname)
                .email(email)
                .build();
    }


}