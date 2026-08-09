package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.enums.PassStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GatePassRepository extends JpaRepository<GatePass, Long> {

    List<GatePass> findByStatus(PassStatus status);
    List<GatePass> findByHostId(Long hostId);
    List<GatePass> findByVisitorId(Long visitorId);
}
