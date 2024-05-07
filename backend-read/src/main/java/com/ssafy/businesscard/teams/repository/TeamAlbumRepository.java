package com.ssafy.businesscard.teams.repository;

import com.ssafy.businesscard.teams.entity.TeamAlbum;
import com.ssafy.businesscard.teams.entity.TeamAlbumDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamAlbumRepository extends JpaRepository<TeamAlbum, Long> {

}
