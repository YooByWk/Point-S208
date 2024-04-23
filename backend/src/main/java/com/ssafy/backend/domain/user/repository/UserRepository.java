package com.ssafy.backend.domain.user.repository;

import com.ssafy.backend.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

	int countByEmail(String email);

	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);
}
