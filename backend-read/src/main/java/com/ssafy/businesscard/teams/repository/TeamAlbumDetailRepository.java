package com.ssafy.businesscard.teams.repository;

import com.ssafy.businesscard.teams.entity.TeamAlbumDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamAlbumDetailRepository extends JpaRepository<TeamAlbumDetail, Long> {
    public int countByTeamAlbum_TeamAlbumId(Long teamAlbumId);
    Page<TeamAlbumDetail> findByTeamAlbum_TeamAlbumId(Long userId, Pageable pageable);
    List<TeamAlbumDetail> findByTeamAlbum_TeamAlbumId(Long teamAlbumId);
}
