package com.ssafy.backend.domain.book.dto.response;

import com.ssafy.backend.domain.book.dto.BookPageSentenceDto;
import com.ssafy.backend.domain.education.dto.EducationDto;
import jakarta.persistence.Column;
import lombok.Builder;

import java.util.List;

@Builder
public record BookPageResponseDto(
        Long bookPageId,
        String bookImagePath,
        int page,
        String content,
        @Column(name = "sentence")
        List<BookPageSentenceDto> bookPageSentences,
        EducationDto education
) {

}
