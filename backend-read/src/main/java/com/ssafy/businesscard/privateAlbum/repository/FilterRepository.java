package com.ssafy.businesscard.privateAlbum.repository;

import com.ssafy.businesscard.privateAlbum.entity.Filter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilterRepository extends JpaRepository<Filter, Long> {
}
