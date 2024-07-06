package com.example.mine.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mine.entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board,Integer> {
    
    // Page<Board> findByType(String searchKeyword);
}
