package com.ssafy.businesscard.domain.team.repository;

import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamAlbumMemberRepository extends JpaRepository<TeamAlbumMember, Long> {
    Optional<TeamAlbumMember> findByTeamAlbumDetail_Businesscard_CardIdAndFilter_FilterId(Long cardId, Long filterId);
    Optional<TeamAlbumMember> findByTeamAlbum_TeamAlbumIdAndFilter_FilterName(Long teamAlbumId, String filterName);
}
