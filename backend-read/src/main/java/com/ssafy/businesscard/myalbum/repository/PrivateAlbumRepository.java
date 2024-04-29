package com.ssafy.businesscard.myalbum.repository;

import com.ssafy.businesscard.myalbum.entity.PrivateAlbumDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivateAlbumRepository extends JpaRepository<PrivateAlbumDetail, Long> {
}
