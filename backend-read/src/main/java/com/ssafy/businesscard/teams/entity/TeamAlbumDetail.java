package com.ssafy.businesscard.teams.entity;

import com.ssafy.businesscard.mycard.entity.Businesscard;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TeamAlbumDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamAlbumDetailId;

    @ManyToOne
    @JoinColumn(name = "team_album_id")
    private TeamAlbum teamAlbum;

    @ManyToOne
    @JoinColumn(name = "card_id")
    private Businesscard businesscard;
}
