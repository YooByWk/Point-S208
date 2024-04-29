package com.ssafy.businesscard.card.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.team.entity.TeamAlbumDetail;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Fetch;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Filter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "filter_id")
    private Long filterId;

    @Column(name = "filter_name", length = 30)
    @ColumnDefault("none")
    private String filterName;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "private_album_id")
    private PrivateAlbum privateAlbum;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_album_detail_id")
    private TeamAlbumDetail teamAlbumDetail;
}
