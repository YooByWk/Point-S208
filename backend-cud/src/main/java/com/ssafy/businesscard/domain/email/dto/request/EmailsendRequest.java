package com.ssafy.businesscard.domain.email.dto.request;

import jakarta.validation.constraints.NotNull;

public record EmailsendRequest(@NotNull String recipientEmail) {

}
