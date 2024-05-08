package com.ssafy.businesscard.teams.entity;

import com.ssafy.businesscard.privateAlbum.entity.Filter;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TeamAlbumMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamAlbumMemberId;

    @ManyToOne
    @JoinColumn(name = "filter_id")
    private Filter filter;

    @ManyToOne
    @JoinColumn(name = "team_album_id")
    private TeamAlbum teamAlbum;

    @ManyToOne
    @JoinColumn(name = "team_album_detail_id")
    private TeamAlbumDetail teamAlbumDetail;
}
