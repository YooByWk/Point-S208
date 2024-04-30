package com.ssafy.businesscard.domain.myalbum.repository;

import com.ssafy.businesscard.domain.card.entity.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateAlbumFilterRepository extends JpaRepository<Filter, Long> {
}
