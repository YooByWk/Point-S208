package com.ssafy.businesscard.domain.card.repository;

import com.ssafy.businesscard.domain.card.entity.Businesscard;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinesscardCustomRepository {
    Businesscard findCardByEmail(Long userId, String email);
}
