package com.ssafy.businesscard.domain.team.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamAlbumDetail is a Querydsl query type for TeamAlbumDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamAlbumDetail extends EntityPathBase<TeamAlbumDetail> {

    private static final long serialVersionUID = 2147407158L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamAlbumDetail teamAlbumDetail = new QTeamAlbumDetail("teamAlbumDetail");

    public final com.ssafy.businesscard.domain.card.entity.QBusinesscard businesscard;

    public final StringPath memo = createString("memo");

    public final QTeamAlbum teamAlbum;

    public final NumberPath<Long> teamAlbumDetailId = createNumber("teamAlbumDetailId", Long.class);

    public final ListPath<TeamAlbumMember, QTeamAlbumMember> teamAlbumMemberList = this.<TeamAlbumMember, QTeamAlbumMember>createList("teamAlbumMemberList", TeamAlbumMember.class, QTeamAlbumMember.class, PathInits.DIRECT2);

    public QTeamAlbumDetail(String variable) {
        this(TeamAlbumDetail.class, forVariable(variable), INITS);
    }

    public QTeamAlbumDetail(Path<? extends TeamAlbumDetail> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamAlbumDetail(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamAlbumDetail(PathMetadata metadata, PathInits inits) {
        this(TeamAlbumDetail.class, metadata, inits);
    }

    public QTeamAlbumDetail(Class<? extends TeamAlbumDetail> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.businesscard = inits.isInitialized("businesscard") ? new com.ssafy.businesscard.domain.card.entity.QBusinesscard(forProperty("businesscard"), inits.get("businesscard")) : null;
        this.teamAlbum = inits.isInitialized("teamAlbum") ? new QTeamAlbum(forProperty("teamAlbum"), inits.get("teamAlbum")) : null;
    }

}

