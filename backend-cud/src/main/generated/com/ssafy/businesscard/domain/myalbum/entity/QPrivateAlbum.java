package com.ssafy.businesscard.domain.myalbum.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPrivateAlbum is a Querydsl query type for PrivateAlbum
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPrivateAlbum extends EntityPathBase<PrivateAlbum> {

    private static final long serialVersionUID = 123481721L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPrivateAlbum privateAlbum = new QPrivateAlbum("privateAlbum");

    public final com.ssafy.businesscard.global.QBaseTimeEntity _super = new com.ssafy.businesscard.global.QBaseTimeEntity(this);

    public final com.ssafy.businesscard.domain.card.entity.QBusinesscard businesscard;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final BooleanPath favorite = createBoolean("favorite");

    public final StringPath memo = createString("memo");

    public final NumberPath<Long> privateAlbumId = createNumber("privateAlbumId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.ssafy.businesscard.domain.user.entity.QUser user;

    public QPrivateAlbum(String variable) {
        this(PrivateAlbum.class, forVariable(variable), INITS);
    }

    public QPrivateAlbum(Path<? extends PrivateAlbum> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPrivateAlbum(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPrivateAlbum(PathMetadata metadata, PathInits inits) {
        this(PrivateAlbum.class, metadata, inits);
    }

    public QPrivateAlbum(Class<? extends PrivateAlbum> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.businesscard = inits.isInitialized("businesscard") ? new com.ssafy.businesscard.domain.card.entity.QBusinesscard(forProperty("businesscard"), inits.get("businesscard")) : null;
        this.user = inits.isInitialized("user") ? new com.ssafy.businesscard.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

