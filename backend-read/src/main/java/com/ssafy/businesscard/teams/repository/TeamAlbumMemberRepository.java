package com.ssafy.businesscard.teams.repository;

import com.ssafy.businesscard.teams.entity.TeamAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamAlbumMemberRepository extends JpaRepository<TeamAlbumMember, Long> {
}
