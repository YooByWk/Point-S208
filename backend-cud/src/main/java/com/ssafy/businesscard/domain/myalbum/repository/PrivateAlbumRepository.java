package com.ssafy.businesscard.domain.myalbum.repository;

import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateAlbumRepository extends JpaRepository<PrivateAlbum, Long> {
    PrivateAlbum findByUser_userId(Long userId);
    PrivateAlbum findByUser_userIdAndBusinesscard_CardId(Long userId, Long cardId);
}
