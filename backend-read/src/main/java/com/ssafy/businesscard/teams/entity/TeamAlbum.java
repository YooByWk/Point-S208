package com.ssafy.businesscard.teams.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TeamAlbum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamAlbumId;

    @Column(nullable = false, length = 100)
    private String teamName;

    @Column(nullable = false)
    private Long teamOwner;
}
