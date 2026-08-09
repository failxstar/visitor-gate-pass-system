package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.VisitorRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VisitorRequestRepository extends JpaRepository<VisitorRequest, Long> {
    List<VisitorRequest> findByHostOrderByIdDesc(String host);
}
