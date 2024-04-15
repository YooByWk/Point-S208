package com.ssafy.businesscard.security.repository;

import com.ssafy.businesscard.security.model.entity.InvalidToken;
import org.springframework.data.repository.CrudRepository;

public interface InvalidTokenRepository extends CrudRepository<InvalidToken, String> {
}
