package com.ssafy.businesscard.domain.myalbum.repository.privateAlbum;

import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;

import java.util.List;

public interface PrivateAlbumCustomRepository {
    List<PrivateAlbum> findByUser_userIdAndBusinesscard_email(Long userId, String email);
}
