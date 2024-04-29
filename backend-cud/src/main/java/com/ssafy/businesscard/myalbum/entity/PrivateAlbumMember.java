package com.ssafy.businesscard.myalbum.entity;

import com.ssafy.businesscard.card.entity.Filter;
import com.ssafy.businesscard.user.entity.User;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
@IdClass(AlbumMemberId.class)
public class PrivateAlbumMember {

    @Id
    @JoinColumn(name = "filter_id")
    @ManyToOne
    private Filter filter;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JoinColumn(name = "private_album_id")
    @ManyToOne
    private PrivateAlbum privateAlbum;

    @Builder
    public PrivateAlbumMember(Filter filter, User user, PrivateAlbum privateAlbum) {
        this.filter = filter;
        this.user = user;
        this.privateAlbum = privateAlbum;
    }
}
