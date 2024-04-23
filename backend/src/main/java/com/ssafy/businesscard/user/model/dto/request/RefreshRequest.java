package com.ssafy.businesscard.user.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Schema(description = "토큰갱신 요청 DTO")
public class RefreshRequest {
    @Schema(example="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJleGFtcGxlQGV4YW1wbGUuY29tIiwicm9sZSI6Ik1FTUJFUiIsImlhdCI6MTcxMDMxNjkxNSwiZXhwIjoxNzEwOTIxNzE1fQ.Z90_QwIuK2xNImclZ30VgNBB9Vm8lvCGKBEH8ARzWwE",
            description="JWT 리프레쉬 토큰")
    private String refreshToken;
}
