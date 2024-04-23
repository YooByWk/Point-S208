package com.ssafy.backend.domain.book.entity;

import com.ssafy.backend.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
@IdClass(ProgressBookId.class)
public class BookPurchasedLearning {

    @Id
    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;

    @Id
    @JoinColumn(name = "book_id")
    @ManyToOne
    private Book book;

    @Builder
    public BookPurchasedLearning(User user, Book book) {
        this.user = user;
        this.book = book;
    }
}
