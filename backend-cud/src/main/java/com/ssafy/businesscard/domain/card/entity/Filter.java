package com.ssafy.businesscard.domain.card.entity;

import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
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

    @OneToMany(mappedBy = "filter", cascade = CascadeType.ALL)
    private List<TeamAlbumMember> teamAlbumMemberList = new ArrayList<>();
}
