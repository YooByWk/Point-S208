package com.ssafy.businesscard.domain.team.repository;

import com.ssafy.businesscard.domain.card.entity.Filter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamAlbumFilterRepository extends JpaRepository<Filter, Long> {
    Optional<Filter> findByFilterName(String filterName);
}
