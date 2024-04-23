package com.ssafy.backend.domain.approval.repository;

import com.ssafy.backend.domain.approval.entity.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApprovalRepository extends JpaRepository<Approval, Long>{
    List<Approval> findByUser_userId(Long userId);
    Optional<Approval> findByUser_userIdAndBook_bookId(Long userId, Long bookId);
}
