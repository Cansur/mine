package com.example.mine.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.mine.entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board,Integer> {
    
    List<Board> findByType(String type, Pageable pageable);
}
