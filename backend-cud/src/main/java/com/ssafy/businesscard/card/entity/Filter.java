package com.ssafy.businesscard.card.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.team.entity.TeamAlbumDetail;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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
    @Builder.Default
    private String filterName = "none";

    @OneToMany(mappedBy = "filter", cascade = CascadeType.ALL)
    private List<PrivateAlbumMember> privateAlbumMemberList = new ArrayList<>();

}
