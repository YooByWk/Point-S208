package com.ssafy.businesscard.domain.card.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFilter is a Querydsl query type for Filter
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFilter extends EntityPathBase<Filter> {

    private static final long serialVersionUID = -432549544L;

    public static final QFilter filter = new QFilter("filter");

    public final NumberPath<Long> filterId = createNumber("filterId", Long.class);

    public final StringPath filterName = createString("filterName");

    public final ListPath<com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember, com.ssafy.businesscard.domain.myalbum.entity.QPrivateAlbumMember> privateAlbumMemberList = this.<com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember, com.ssafy.businesscard.domain.myalbum.entity.QPrivateAlbumMember>createList("privateAlbumMemberList", com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbumMember.class, com.ssafy.businesscard.domain.myalbum.entity.QPrivateAlbumMember.class, PathInits.DIRECT2);

    public final ListPath<com.ssafy.businesscard.domain.team.entity.TeamAlbumMember, com.ssafy.businesscard.domain.team.entity.QTeamAlbumMember> teamAlbumMemberList = this.<com.ssafy.businesscard.domain.team.entity.TeamAlbumMember, com.ssafy.businesscard.domain.team.entity.QTeamAlbumMember>createList("teamAlbumMemberList", com.ssafy.businesscard.domain.team.entity.TeamAlbumMember.class, com.ssafy.businesscard.domain.team.entity.QTeamAlbumMember.class, PathInits.DIRECT2);

    public QFilter(String variable) {
        super(Filter.class, forVariable(variable));
    }

    public QFilter(Path<? extends Filter> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFilter(PathMetadata metadata) {
        super(Filter.class, metadata);
    }

}

