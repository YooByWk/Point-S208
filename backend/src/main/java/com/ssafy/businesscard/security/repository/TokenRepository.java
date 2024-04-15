package com.ssafy.businesscard.security.repository;

import com.ssafy.businesscard.security.model.entity.Token;
import org.springframework.data.repository.CrudRepository;

public interface TokenRepository extends CrudRepository<Token, Long>{
}
