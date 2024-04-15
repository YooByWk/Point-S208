package com.ssafy.businesscard.security.model.entity;

import com.ssafy.businesscard.user.model.entity.MemberProfile;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;

public enum OAuthAttributes {
    GOOGLE("google", (attributes) -> {
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNickname((String) attributes.get("name"));
        memberProfile.setEmail((String) attributes.get("email"));
        return memberProfile;
    }),

    NAVER("naver", (attributes) -> {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        System.out.println(response);
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNickname((String) response.get("name"));
        memberProfile.setEmail(((String) response.get("email")));
        return memberProfile;
    }),
    MICROSOFT("microsoft", (attributes) -> {
        // Microsoft의 경우, 사용자 정보를 가져오는 필드명에 주의하세요.
        // 예시에서는 일반적으로 사용되는 필드명을 사용했습니다. 실제 필드명은 Microsoft의 문서를 참조하세요.
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNickname((String) attributes.get("displayName")); // Microsoft에서는 displayName을 사용할 수 있습니다.
        memberProfile.setEmail((String) attributes.get("userPrincipalName")); // 이메일 정보는 userPrincipalName에 있을 수 있습니다.
        return memberProfile;
    }),

    KAKAO("kakao", (attributes) -> {
        // kakao는 kakao_account에 유저정보가 있다. (email)
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        // kakao_account안에 또 profile이라는 JSON객체가 있다. (nickname, profile_image)
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile");

        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setNickname((String) kakaoProfile.get("nickname"));
        memberProfile.setEmail((String) kakaoAccount.get("email"));
        return memberProfile;
    });

    private final String registrationId;
    private final Function<Map<String, Object>, MemberProfile> of;

    OAuthAttributes(String registrationId, Function<Map<String, Object>, MemberProfile> of) {
        this.registrationId = registrationId;
        this.of = of;
    }

    public static MemberProfile extract(String registrationId, Map<String, Object> attributes) {
        return Arrays.stream(values())
                .filter(provider -> registrationId.equals(provider.registrationId))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new)
                .of.apply(attributes);
    }

}