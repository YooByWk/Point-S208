package com.ssafy.businesscard.myalbum.repository;

import com.ssafy.businesscard.myalbum.entity.PrivateAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateAlbumMemberRepository extends JpaRepository<PrivateAlbumMember, Long> {
}
