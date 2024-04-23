package com.ssafy.backend.domain.book.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    @Column(nullable = false)
    private String title;

    private String summary;

    @Column(nullable = false)
    private String coverPath;

    @Column(nullable = false)
    private int price;

    @OneToMany(mappedBy = "book")
    private List<BookPage> bookPageList = new ArrayList<>();

}
