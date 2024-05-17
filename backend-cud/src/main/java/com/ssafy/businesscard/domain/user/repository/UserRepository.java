package com.ssafy.businesscard.domain.user.repository;

import com.ssafy.businesscard.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u.userId FROM User u WHERE u.name = :name AND u.email = :email")
    Long findUserIdByNameAndEmail(@Param("name") String name, @Param("email") String email);
}

