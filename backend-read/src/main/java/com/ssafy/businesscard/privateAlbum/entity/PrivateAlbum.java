package com.ssafy.businesscard.privateAlbum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.global.BaseTimeEntity;
import com.ssafy.businesscard.mycard.entity.Businesscard;
import com.ssafy.businesscard.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PrivateAlbum extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "private_album_id")
    private Long privateAlbumDetailId;

    @Column(name = "favorite", nullable = false, columnDefinition = "boolean default false")
    @Builder.Default
    private boolean favorite = false;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "card_id")
    private Businesscard businesscard;

    @Column(name = "memo", length = 100)
    private String memo;
}
