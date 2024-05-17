package com.ssafy.businesscard.privateAlbum.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
