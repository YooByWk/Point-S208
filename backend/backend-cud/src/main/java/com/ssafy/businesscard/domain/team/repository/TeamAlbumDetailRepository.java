package com.ssafy.businesscard.domain.team.repository;

import com.ssafy.businesscard.domain.team.entity.TeamAlbumDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamAlbumDetailRepository extends JpaRepository<TeamAlbumDetail, Long> {
    TeamAlbumDetail findByTeamAlbum_teamAlbumIdAndBusinesscard_CardId(Long teamAlbumId, Long cardId);

    List<TeamAlbumDetail> findAllByTeamAlbum_teamAlbumId(Long teamAlbumId);

    TeamAlbumDetail findByTeamAlbum_TeamAlbumIdAndBusinesscard_Email(Long teamAlbumId, String eamil);
}
