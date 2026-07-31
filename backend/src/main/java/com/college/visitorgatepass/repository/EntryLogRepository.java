package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.EntryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntryLogRepository extends JpaRepository<EntryLog, Long> {
}
