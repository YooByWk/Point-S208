package com.ssafy.businesscard.domain.card.repository;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BusinesscardRepository extends JpaRepository<Businesscard, Long> {
    Optional<Businesscard> findByUser_userIdAndFrontBack(Long userId, Businesscard.Status frontBack);
    Businesscard findByUser_userIdAndCardId(Long userId, Long cardId);
    List<Businesscard> findAllByUser_userId(Long userId);
}
