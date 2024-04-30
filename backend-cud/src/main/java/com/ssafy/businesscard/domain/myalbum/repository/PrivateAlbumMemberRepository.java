package com.ssafy.businesscard.domain.myalbum.repository;

import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateAlbumMemberRepository extends JpaRepository<PrivateAlbumMember, Long> {
    PrivateAlbumMember findByUser_userIdAndFilter_filterId(Long userId, Long filterId);
}
