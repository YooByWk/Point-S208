package com.ssafy.businesscard.card.repository;

import com.ssafy.businesscard.card.entity.Businesscard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinesscardRepository extends JpaRepository<Businesscard, Long> {
    List<Businesscard> findAllByUser_userId(Long userId);
    Optional<Businesscard> findByUser_userIdAndFrontBack(Long userId, Businesscard.Status frontBack);
}
