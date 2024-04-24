package com.ssafy.businesscard.card.repository;

import com.ssafy.businesscard.card.model.entity.Businesscard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinesscardRepository extends JpaRepository<Businesscard, Long> {
}
