package com.ssafy.businesscard.privateAlbum.repository;

import com.ssafy.businesscard.privateAlbum.dto.PrivateAlbumResponseDto;
import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PrivateAlbumRepository extends JpaRepository<PrivateAlbum, Long> {
    Page<PrivateAlbum> findByUser_userId(Long userId, Pageable pageable);
    Optional<PrivateAlbum> findByUser_userIdAndBusinesscard_cardId(Long userId, Long cardId);
}
