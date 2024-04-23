package com.ssafy.backend.domain.education.repository.education;

import com.ssafy.backend.domain.education.dto.BookEducationDto;
import com.ssafy.backend.domain.education.entity.Education;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EducationRepository extends JpaRepository<Education, Long>, EducationCustomRepository {

}
