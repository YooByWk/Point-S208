package com.ssafy.businesscard.domain.myalbum.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.global.BaseTimeEntity;
import com.ssafy.businesscard.domain.user.entity.User;
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
    private Long privateAlbumId;

    @Column(name = "favorite", nullable = false)
    @Builder.Default
    private boolean favorite = false;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "card_id")
    private Businesscard businesscard;


}
