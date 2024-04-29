package com.ssafy.businesscard.team.entity;

import com.ssafy.businesscard.card.entity.Businesscard;
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
    @Column(name = "team_album_detail_id")
    private Long teamAlbumDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_album_id")
    private TeamAlbum teamAlbum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Businesscard businesscard;
}
