package com.ssafy.businesscard.mycard.repository;

import com.ssafy.businesscard.mycard.dto.MycardResponseDto;
import com.ssafy.businesscard.mycard.entity.Businesscard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinesscardRepository extends JpaRepository<Businesscard, Long> {
    List<MycardResponseDto> findByUser_UserId(Long userId);
    List<Businesscard> findAllByNameContainingOrCompanyContaining(String name, String company);

}
