package com.ssafy.businesscard.privateAlbum.repository;

import com.ssafy.businesscard.privateAlbum.entity.PrivateAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrivateAlbumMemberRepository extends JpaRepository<PrivateAlbumMember, Long> {
    List<PrivateAlbumMember> findByUser_userId(Long userId);
    List<PrivateAlbumMember> findByFilter_FilterIdAndUser_UserId(Long filterId, Long userId);
}
