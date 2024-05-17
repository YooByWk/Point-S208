package com.ssafy.businesscard.domain.myalbum.repository;

import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PrivateAlbumMemberRepository extends JpaRepository<PrivateAlbumMember, Long> {
    Optional<PrivateAlbumMember> findByPrivateAlbum_Businesscard_CardIdAndFilter_FilterId(Long cardId, Long filterId);
    Optional<PrivateAlbumMember> findByUser_UserIdAndFilter_FilterName(Long userId, String filterName);
    PrivateAlbumMember findByUser_UserIdAndFilter_FilterId(Long userId, Long filterId);
}
