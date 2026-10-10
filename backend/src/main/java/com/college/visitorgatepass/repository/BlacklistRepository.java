package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {
    boolean existsByVisitorPhone(String phone);
    Optional<Blacklist> findByVisitorPhone(String phone);
}
