package com.ssafy.businesscard.domain.card.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBusinesscard is a Querydsl query type for Businesscard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBusinesscard extends EntityPathBase<Businesscard> {

    private static final long serialVersionUID = 863533232L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBusinesscard businesscard = new QBusinesscard("businesscard");

    public final com.ssafy.businesscard.global.QBaseTimeEntity _super = new com.ssafy.businesscard.global.QBaseTimeEntity(this);

    public final StringPath address = createString("address");

    public final NumberPath<Long> cardId = createNumber("cardId", Long.class);

    public final StringPath company = createString("company");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath department = createString("department");

    public final StringPath digitalPicture = createString("digitalPicture");

    public final StringPath domainUrl = createString("domainUrl");

    public final StringPath email = createString("email");

    public final StringPath faxNumber = createString("faxNumber");

    public final EnumPath<Businesscard.Status> frontBack = createEnum("frontBack", Businesscard.Status.class);

    public final StringPath landlineNumber = createString("landlineNumber");

    public final StringPath name = createString("name");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath position = createString("position");

    public final StringPath rank = createString("rank");

    public final StringPath realPicture = createString("realPicture");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public final com.ssafy.businesscard.domain.user.entity.QUser user;

    public QBusinesscard(String variable) {
        this(Businesscard.class, forVariable(variable), INITS);
    }

    public QBusinesscard(Path<? extends Businesscard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBusinesscard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBusinesscard(PathMetadata metadata, PathInits inits) {
        this(Businesscard.class, metadata, inits);
    }

    public QBusinesscard(Class<? extends Businesscard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.user = inits.isInitialized("user") ? new com.ssafy.businesscard.domain.user.entity.QUser(forProperty("user")) : null;
    }

}

