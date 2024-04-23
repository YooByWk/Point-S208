package com.ssafy.backend.domain.book.repository.book;

import com.ssafy.backend.domain.book.entity.Book;
import com.ssafy.backend.domain.book.mapper.CoverPathMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long>, BookCustomRepository{
    List<CoverPathMapping> findAllBy();
}
