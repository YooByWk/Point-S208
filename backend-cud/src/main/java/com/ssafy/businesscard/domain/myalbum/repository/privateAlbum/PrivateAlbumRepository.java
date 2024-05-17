package com.ssafy.businesscard.domain.myalbum.repository.privateAlbum;

import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrivateAlbumRepository extends JpaRepository<PrivateAlbum, Long>, PrivateAlbumCustomRepository{
    PrivateAlbum findByUser_userIdAndBusinesscard_cardId(Long userId, Long cardId);
    List<PrivateAlbum> findAllByUser_userId(Long userId);
}
