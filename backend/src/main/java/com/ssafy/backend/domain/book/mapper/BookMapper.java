package com.ssafy.backend.domain.book.mapper;

import com.ssafy.backend.domain.book.dto.BookPageSentenceDto;
import com.ssafy.backend.domain.book.dto.UserBookProcessDto;
import com.ssafy.backend.domain.book.entity.BookPageSentence;
import com.ssafy.backend.domain.book.entity.UserBookProcess;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookPageSentenceDto toBookPageSentenceDto(BookPageSentence bookPageSentence);

    @Mapping(source = "userBookProcess.book.bookId", target = "bookId")
    @Mapping(source = "userBookProcess.book.title", target = "title")
    @Mapping(source = "userBookProcess.book.coverPath", target = "coverPath")
    UserBookProcessDto toUserBookProcessDto(UserBookProcess userBookProcess);
}
