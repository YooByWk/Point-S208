package com.ssafy.businesscard.user.model.dto.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@Schema(description = "회원가입 요청 DTO")
public class UserRegisterRequest {

    @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,6}$", message = "이메일 형식에 맞지 않습니다.")
    @NotNull
    @Schema(example = "example@example.com", description = "유저 아이디가 될 이메일")
    private String email;

    @NotNull(message = "비밀번호는 필수 입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    @Schema(example = "examplePwd1234!",description = "유저가 앞으로 사용할 비밀번호")
    private String password;

    @NotNull(message = "닉네임은 필수입니다.")
    @Schema(example="happyday1",description = "유저가 앞으로 사용할 닉네임")
    private String nickname;

    @Schema(example="MYAPP",description = "일반회원가입 : MYAPP, 소셜 회원가입 자동등록")
    private String authProvider;

    private String name;


}
