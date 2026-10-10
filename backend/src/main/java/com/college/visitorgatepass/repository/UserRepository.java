package com.college.visitorgatepass.repository;

import com.college.visitorgatepass.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import com.college.visitorgatepass.model.enums.Role;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE admins SET password_hash = :hash WHERE email = :email")
    int updateAdminPasswordHash(@Param("email") String email, @Param("hash") String hash);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE guards SET password_hash = :hash WHERE email = :email")
    int updateGuardPasswordHash(@Param("email") String email, @Param("hash") String hash);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "UPDATE hosts SET password_hash = :hash WHERE email = :email")
    int updateHostPasswordHash(@Param("email") String email, @Param("hash") String hash);
}
