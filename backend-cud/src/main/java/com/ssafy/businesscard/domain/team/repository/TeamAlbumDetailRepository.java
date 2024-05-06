package com.ssafy.businesscard.domain.team.repository;

import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamAlbumDetailRepository extends JpaRepository<TeamAlbumDetail, Long> {
    TeamAlbumDetail findByTeamAlbum_teamAlbumId(Long teamAlbumId);

    List<TeamAlbumDetail> findAllByTeamAlbum_teamAlbumId(Long teamAlbumId);
}
