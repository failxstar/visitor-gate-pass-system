package com.college.visitorgatepass.config;

import com.college.visitorgatepass.model.entity.Admin;
import com.college.visitorgatepass.model.entity.Guard;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.model.enums.Role;
import com.college.visitorgatepass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private static final String DEFAULT_PASSWORD = "admin123";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        String hash = passwordEncoder.encode(DEFAULT_PASSWORD);
        log.info("DataInitializer: generated hash prefix = {}", hash.substring(0, 7));

        seedAdmin(hash);
        seedGuard(hash);
        seedHost(hash);
    }

    private void seedAdmin(String hash) {
        String email = "admin@college.edu";
        try {
            User existing = userRepository.findByEmail(email).orElse(null);
            if (existing != null) {
                existing.setPasswordHash(hash);
                userRepository.save(existing);
                log.info("DataInitializer: reset admin password for '{}'", email);
            } else {
                Admin admin = Admin.builder()
                        .name("System Admin")
                        .email(email)
                        .passwordHash(hash)
                        .role(Role.ADMIN)
                        .build();
                userRepository.save(admin);
                log.info("DataInitializer: created admin '{}'", email);
            }
        } catch (Exception e) {
            log.error("DataInitializer: failed for admin '{}': {}", email, e.getMessage());
            throw new RuntimeException("Failed to seed admin", e);
        }
    }

    private void seedGuard(String hash) {
        String email = "guard@college.edu";
        try {
            User existing = userRepository.findByEmail(email).orElse(null);
            if (existing != null) {
                existing.setPasswordHash(hash);
                userRepository.save(existing);
                log.info("DataInitializer: reset guard password for '{}'", email);
            } else {
                Guard guard = Guard.builder()
                        .name("Security Guard")
                        .email(email)
                        .passwordHash(hash)
                        .role(Role.GUARD)
                        .build();
                userRepository.save(guard);
                log.info("DataInitializer: created guard '{}'", email);
            }
        } catch (Exception e) {
            log.error("DataInitializer: failed for guard '{}': {}", email, e.getMessage());
            throw new RuntimeException("Failed to seed guard", e);
        }
    }

    private void seedHost(String hash) {
        String email = "host@college.edu";
        try {
            User existing = userRepository.findByEmail(email).orElse(null);
            if (existing != null) {
                existing.setPasswordHash(hash);
                userRepository.save(existing);
                log.info("DataInitializer: reset host password for '{}'", email);
            } else {
                Host host = Host.builder()
                        .name("Prof. John Host")
                        .email(email)
                        .passwordHash(hash)
                        .role(Role.HOST)
                        .build();
                userRepository.save(host);
                log.info("DataInitializer: created host '{}'", email);
            }
        } catch (Exception e) {
            log.error("DataInitializer: failed for host '{}': {}", email, e.getMessage());
            throw new RuntimeException("Failed to seed host", e);
        }
    }
}

