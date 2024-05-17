package com.ssafy.businesscard.teams.repository;

import com.ssafy.businesscard.teams.entity.TeamAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamAlbumMemberRepository extends JpaRepository<TeamAlbumMember, Long> {
    List<TeamAlbumMember> findByTeamAlbumDetail_TeamAlbumDetailId(Long teamsAlbumDetailId);
    List<TeamAlbumMember> findByTeamAlbum_TeamAlbumIdAndFilter_filterId(Long teamAlbumId, Long filterId);
}
