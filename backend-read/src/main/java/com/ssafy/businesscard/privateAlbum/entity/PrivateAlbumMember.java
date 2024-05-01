package com.ssafy.businesscard.privateAlbum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PrivateAlbumMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long privateAlbumMemberId;

    @JsonIgnore
    @JoinColumn(name = "filter_id")
    @ManyToOne
    private Filter filter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JoinColumn(name = "private_album_id")
    @ManyToOne
    private PrivateAlbum privateAlbum;
}
