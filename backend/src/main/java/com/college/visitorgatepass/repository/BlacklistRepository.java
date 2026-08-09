package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlacklistRepository extends JpaRepository<Blacklist, Long> {

    boolean existsByVisitorId(Long visitorId);
    Optional<Blacklist> findByVisitorId(Long visitorId);
}
