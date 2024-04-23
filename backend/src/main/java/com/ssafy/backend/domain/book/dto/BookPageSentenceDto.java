package com.ssafy.backend.domain.book.dto;

import lombok.Builder;

@Builder
public record BookPageSentenceDto(
        Long bookPageSentenceId,
        int sequence,
        String sentence,
        String sentenceSoundPath

) {
}
