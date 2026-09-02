package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.Guard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuardRepository extends JpaRepository<Guard, Long> {
}
