package com.ssafy.businesscard.domain.team.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.domain.card.entity.Filter;
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
    @Column(name = "team_album_member_id")
    private Long teamAlbumMemberId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filter_id")
    private Filter filter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_album_id")
    private TeamAlbum teamAlbum;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_album_detail_id")
    private TeamAlbumDetail teamAlbumDetail;
}
