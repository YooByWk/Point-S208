package com.ssafy.businesscard.domain.team.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamAlbum is a Querydsl query type for TeamAlbum
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamAlbum extends EntityPathBase<TeamAlbum> {

    private static final long serialVersionUID = -1753675643L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamAlbum teamAlbum = new QTeamAlbum("teamAlbum");

    public final ListPath<TeamAlbumDetail, QTeamAlbumDetail> teamAlbumDetail = this.<TeamAlbumDetail, QTeamAlbumDetail>createList("teamAlbumDetail", TeamAlbumDetail.class, QTeamAlbumDetail.class, PathInits.DIRECT2);

    public final NumberPath<Long> teamAlbumId = createNumber("teamAlbumId", Long.class);

    public final ListPath<TeamMember, QTeamMember> teamMembers = this.<TeamMember, QTeamMember>createList("teamMembers", TeamMember.class, QTeamMember.class, PathInits.DIRECT2);

    public final StringPath teamName = createString("teamName");

    public final com.ssafy.businesscard.domain.user.entity.QUser user;

    public QTeamAlbum(String variable) {
        this(TeamAlbum.class, forVariable(variable), INITS);
    }

    public QTeamAlbum(Path<? extends TeamAlbum> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamAlbum(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamAlbum(PathMetadata metadata, PathInits inits) {
        this(TeamAlbum.class, metadata, inits);
    }

    public QTeamAlbum(Class<? extends TeamAlbum> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.businesscard.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

