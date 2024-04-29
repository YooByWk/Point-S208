package com.ssafy.businesscard.team.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.businesscard.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "team_owner")
    private String teamOwner;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
