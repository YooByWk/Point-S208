package com.ssafy.businesscard.domain.myalbum.repository.privateAlbum;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.businesscard.domain.myalbum.entity.PrivateAlbum;
import com.ssafy.businesscard.domain.myalbum.entity.QPrivateAlbum;
import lombok.RequiredArgsConstructor;

import java.util.List;


@RequiredArgsConstructor
public class PrivateAlbumRepoistoryImpl implements PrivateAlbumCustomRepository {
    private final JPAQueryFactory jpaQueryFactory;

    QPrivateAlbum qPrivateAlbum = QPrivateAlbum.privateAlbum;

    @Override
    public List<PrivateAlbum> findByUser_userIdAndBusinesscard_email(Long userId, String email) {
        return jpaQueryFactory
                .select(qPrivateAlbum)
                .from(qPrivateAlbum)
                .where(qPrivateAlbum.user.userId.eq(userId).and(qPrivateAlbum.businesscard.email.eq(email)))
                .fetch();
    }

}
