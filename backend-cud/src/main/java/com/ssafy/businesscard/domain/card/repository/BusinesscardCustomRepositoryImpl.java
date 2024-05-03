package com.ssafy.businesscard.domain.card.repository;

import com.querydsl.core.QueryFactory;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.businesscard.domain.card.entity.Businesscard;
import com.ssafy.businesscard.domain.card.entity.QBusinesscard;
import com.ssafy.businesscard.domain.myalbum.entity.QPrivateAlbum;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class BusinesscardCustomRepositoryImpl implements BusinesscardCustomRepository{

    private final JPAQueryFactory jpaQueryFactory;
    QBusinesscard qBusinesscard = QBusinesscard.businesscard;
    QPrivateAlbum qPrivateAlbum = QPrivateAlbum.privateAlbum;
    @Override
    public Businesscard findCardByEmail(Long userId, String email) {
        return jpaQueryFactory
                .select(qBusinesscard)
                .from(qBusinesscard)
                .where(qPrivateAlbum.user.userId.eq(userId).and(qPrivateAlbum.businesscard.email.eq(email)))
                .fetchOne();
    }
}
