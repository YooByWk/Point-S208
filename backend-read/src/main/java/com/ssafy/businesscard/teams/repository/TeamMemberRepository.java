package com.ssafy.businesscard.teams.repository;

import com.ssafy.businesscard.teams.dto.TeamMemberListResponseDto;
import com.ssafy.businesscard.teams.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    public List<TeamMember> findByUser_UserId(Long userId);
    public int countByTeamAlbum_TeamAlbumId(Long teamAlbumId);
    public TeamMember findByUser_userIdAndTeamAlbum_TeamAlbumId(Long userId, Long teamAlbumId);
    public List<TeamMember> findByTeamAlbum_TeamAlbumIdAndUser_UserIdNot(Long userId, Long teamAlbumId);
}
