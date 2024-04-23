package com.ssafy.backend.domain.book.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@NoArgsConstructor
@IdClass(ProgressBookId.class)
public class UserBookProcess {

    @Id
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @Id
    @JoinColumn(name = "book_id")
    @ManyToOne
    private Book book;

    @Column(name = "progress_page")
    private int page;

    private boolean isRead;

    @Builder
    public UserBookProcess(User user, Book book, int page, boolean isRead) {
        this.user = user;
        this.book = book;
        this.page = page;
        this.isRead = isRead;
    }
}
