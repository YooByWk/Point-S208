package com.ssafy.businesscard.user.model.dto.response;

import com.ssafy.businesscard.user.model.entity.MemberProfile;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserResponse {

    private Long id;
    private String email;
    private String role;
    private String nickname;
    private String thumbnail;
    private String location;
    private String authProvider;
    private String name;


    public static MemberProfile toEntity(UserResponse userResponse){
        return  MemberProfile.builder()
                .email(userResponse.email)
                .nickname(userResponse.nickname)
                .build();
    }
}
