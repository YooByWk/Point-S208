package com.ssafy.businesscard.user.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserUpdateRequest {
    @NotBlank(message = "닉네임은 필수입니다. 빈 값이나 공백만 있는 값은 허용되지 않습니다.")
    private String newNickname;
}
