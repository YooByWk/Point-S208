package com.ssafy.businesscard.domain.team.entity;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "memo", length = 100)
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_album_id")
    private TeamAlbum teamAlbum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Businesscard businesscard;

    @OneToMany(mappedBy = "teamAlbumDetail", cascade = CascadeType.ALL)
    List<TeamAlbumMember> teamAlbumMemberList = new ArrayList<>();

}
