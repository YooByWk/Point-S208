package com.ssafy.businesscard.domain.team.repository;

import com.ssafy.businesscard.domain.team.entity.TeamAlbumMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamAlbumMemberRepository extends JpaRepository<TeamAlbumMember, Long> {
}
