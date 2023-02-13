package com.makerspace.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Page<Record> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);
}
