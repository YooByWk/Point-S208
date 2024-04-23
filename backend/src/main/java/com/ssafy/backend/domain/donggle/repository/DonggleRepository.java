package com.ssafy.backend.domain.donggle.repository;

import com.ssafy.backend.domain.donggle.entity.Donggle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DonggleRepository extends JpaRepository<Donggle, Long> {
	Optional<Donggle> findBySituation(Donggle.Situation situation);

}