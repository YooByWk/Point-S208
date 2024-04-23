package com.ssafy.backend.domain.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.backend.domain.education.entity.Education;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookPageSentence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookPageSentenceId;

    private int sequence;

    private String sentence;

    private String sentenceSoundPath;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "book_page_id")
    private BookPage bookPage;

    @OneToOne
    private Education education;
}
