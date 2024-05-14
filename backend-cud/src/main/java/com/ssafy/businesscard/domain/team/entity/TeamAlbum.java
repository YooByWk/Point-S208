package com.ssafy.businesscard.domain.team.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class TeamAlbum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_album_id")
    private Long teamAlbumId;

    @Column(name = "team_name", length = 100)
    private String teamName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_owner")
    private User user;

    @OneToMany(mappedBy = "teamAlbum" ,cascade = CascadeType.ALL)
    private List<TeamAlbumDetail> teamAlbumDetail;

    @OneToMany(mappedBy = "teamAlbum", cascade = CascadeType.ALL)
    private List<TeamMember> teamMembers;

}
