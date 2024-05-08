package com.ssafy.businesscard.domain.myalbum.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPrivateAlbumMember is a Querydsl query type for PrivateAlbumMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPrivateAlbumMember extends EntityPathBase<PrivateAlbumMember> {

    private static final long serialVersionUID = -84203917L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPrivateAlbumMember privateAlbumMember = new QPrivateAlbumMember("privateAlbumMember");

    public final com.ssafy.businesscard.domain.card.entity.QFilter filter;

    public final QPrivateAlbum privateAlbum;

    public final NumberPath<Long> privateAlbumMemberId = createNumber("privateAlbumMemberId", Long.class);

    public final com.ssafy.businesscard.domain.user.entity.QUser user;

    public QPrivateAlbumMember(String variable) {
        this(PrivateAlbumMember.class, forVariable(variable), INITS);
    }

    public QPrivateAlbumMember(Path<? extends PrivateAlbumMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPrivateAlbumMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPrivateAlbumMember(PathMetadata metadata, PathInits inits) {
        this(PrivateAlbumMember.class, metadata, inits);
    }

    public QPrivateAlbumMember(Class<? extends PrivateAlbumMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.filter = inits.isInitialized("filter") ? new com.ssafy.businesscard.domain.card.entity.QFilter(forProperty("filter")) : null;
        this.privateAlbum = inits.isInitialized("privateAlbum") ? new QPrivateAlbum(forProperty("privateAlbum"), inits.get("privateAlbum")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.businesscard.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

