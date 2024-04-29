package com.ssafy.businesscard.myalbum.repository;

import com.ssafy.businesscard.myalbum.entity.PrivateAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateAlbumRepository extends JpaRepository<PrivateAlbum, Long> {
}
