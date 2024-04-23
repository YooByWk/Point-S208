package com.ssafy.backend.domain.book.dto.response;

import com.ssafy.backend.domain.education.dto.BookEducationDto;
import lombok.Builder;

import java.util.List;

@Builder
public record BookInfoResponseDto(
        Long bookId,
        String title,
        String coverImagePath,
        int totalPage,
        int processPage,
        List<String> bookPageImagePathList,
        List<String> bookSoundPathList,
        List<BookEducationDto> educationList

) {
}
