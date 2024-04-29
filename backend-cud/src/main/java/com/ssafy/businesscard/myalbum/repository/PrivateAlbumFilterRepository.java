package com.ssafy.businesscard.myalbum.repository;

import com.ssafy.businesscard.card.entity.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivateAlbumFilterRepository extends JpaRepository<Filter, Long> {
}
