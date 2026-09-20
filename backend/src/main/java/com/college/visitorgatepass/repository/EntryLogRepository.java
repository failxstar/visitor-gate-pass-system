package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.EntryLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EntryLogRepository extends JpaRepository<EntryLog, Long> {
    List<EntryLog> findByGatePassId(Long gatePassId);
    Optional<EntryLog> findByGatePassIdAndCheckOutTimeIsNull(Long gatePassId);
    List<EntryLog> findByCheckOutTimeIsNull();
    long countByCheckOutTimeIsNull();

}
