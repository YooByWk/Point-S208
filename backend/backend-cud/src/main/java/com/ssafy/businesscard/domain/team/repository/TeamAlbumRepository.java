package com.ssafy.businesscard.domain.team.repository;

import com.ssafy.businesscard.domain.team.entity.TeamAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamAlbumRepository extends JpaRepository<TeamAlbum, Long> {
    TeamAlbum findByUser_userIdAndTeamName(Long userId, String teamName);
}
