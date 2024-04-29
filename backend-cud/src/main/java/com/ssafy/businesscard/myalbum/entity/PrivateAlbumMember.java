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
    @JoinColumn(name = "private_album_id")
    @ManyToOne
    private PrivateAlbum privateAlbum;

    @Id
    @JoinColumn(name = "filter_id")
    @ManyToOne
    private Filter filter;

    @Builder
    public PrivateAlbumMember(PrivateAlbum privateAlbum, Filter filter) {
        this.privateAlbum = privateAlbum;
        this.filter = filter;
    }
}
