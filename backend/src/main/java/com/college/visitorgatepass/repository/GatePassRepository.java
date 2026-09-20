package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.enums.PassStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GatePassRepository extends JpaRepository<GatePass, Long> {
    long countByStatus(PassStatus status);
    List<GatePass> findTop5ByOrderByCreatedAtDesc();
    List<GatePass> findByHostIdOrderByCreatedAtDesc(Long hostId);
    List<GatePass> findByVisitorIdOrderByCreatedAtDesc(Long visitorId);
    List<GatePass> findByStatusOrderByCreatedAtDesc(PassStatus status);
    Optional<GatePass> findBySecureToken(String secureToken);
}
