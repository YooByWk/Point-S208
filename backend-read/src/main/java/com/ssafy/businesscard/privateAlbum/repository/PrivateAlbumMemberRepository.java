package com.ssafy.businesscard.privateAlbum.repository;

import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivateAlbumMemberRepository extends JpaRepository<PrivateAlbumMember, Long> {
}
