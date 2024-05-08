package com.ssafy.businesscard.domain.team.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamAlbumMember is a Querydsl query type for TeamAlbumMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamAlbumMember extends EntityPathBase<TeamAlbumMember> {

    private static final long serialVersionUID = -1890105473L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamAlbumMember teamAlbumMember = new QTeamAlbumMember("teamAlbumMember");

    public final com.ssafy.businesscard.domain.card.entity.QFilter filter;

    public final QTeamAlbum teamAlbum;

    public final QTeamAlbumDetail teamAlbumDetail;

    public final NumberPath<Long> teamAlbumMemberId = createNumber("teamAlbumMemberId", Long.class);

    public QTeamAlbumMember(String variable) {
        this(TeamAlbumMember.class, forVariable(variable), INITS);
    }

    public QTeamAlbumMember(Path<? extends TeamAlbumMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamAlbumMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamAlbumMember(PathMetadata metadata, PathInits inits) {
        this(TeamAlbumMember.class, metadata, inits);
    }

    public QTeamAlbumMember(Class<? extends TeamAlbumMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.filter = inits.isInitialized("filter") ? new com.ssafy.businesscard.domain.card.entity.QFilter(forProperty("filter")) : null;
        this.teamAlbum = inits.isInitialized("teamAlbum") ? new QTeamAlbum(forProperty("teamAlbum"), inits.get("teamAlbum")) : null;
        this.teamAlbumDetail = inits.isInitialized("teamAlbumDetail") ? new QTeamAlbumDetail(forProperty("teamAlbumDetail"), inits.get("teamAlbumDetail")) : null;
    }

}

