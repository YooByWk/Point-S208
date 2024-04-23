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


    public Member toMember() {
        return Member.builder()
                .name(nickname)
                .email(email)
                .provider(provider)
                .build();
    }

    public UserResponse toUserReponse() {
        return UserResponse.builder()
//                .nickname(  name)
                .nickname(nickname)
                .email(email)
                .authProvider(provider)
                .build();
    }


}