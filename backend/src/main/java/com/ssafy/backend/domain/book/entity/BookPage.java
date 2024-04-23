package com.ssafy.backend.domain.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class BookPage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookPageId;

    @Column(nullable = false)
    private String bookImagePath;

    @Column(nullable = false)
    private int page;

    private String content;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id")
    private Book book;

    @OneToMany(mappedBy = "bookPage", fetch = FetchType.LAZY)
    private List<BookPageSentence> bookPageSentenceList = new ArrayList<>();

}
