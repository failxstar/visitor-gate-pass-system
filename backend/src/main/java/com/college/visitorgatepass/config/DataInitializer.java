package com.college.visitorgatepass.config;

import com.college.visitorgatepass.model.entity.Admin;
import com.college.visitorgatepass.model.entity.Guard;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.enums.Role;
import com.college.visitorgatepass.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationRunner {

    private static final String DEFAULT_PASSWORD = "admin123";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        seedAdmin();
        seedGuard();
        seedHost();
    }

    private void seedAdmin() {
        String email = "admin@college.edu";
        var existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            // Always reset password to ensure it is correct
            var user = existing.get();
            user.setPasswordHash(passwordEncoder.encode(DEFAULT_PASSWORD));
            userRepository.save(user);
            log.info("Reset password for existing admin: {}", email);
        } else {
            Admin admin = Admin.builder()
                    .name("System Admin")
                    .email(email)
                    .passwordHash(passwordEncoder.encode(DEFAULT_PASSWORD))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Created default admin: {}", email);
        }
    }

    private void seedGuard() {
        String email = "guard@college.edu";
        var existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            var user = existing.get();
            user.setPasswordHash(passwordEncoder.encode(DEFAULT_PASSWORD));
            userRepository.save(user);
            log.info("Reset password for existing guard: {}", email);
        } else {
            Guard guard = Guard.builder()
                    .name("Security Guard")
                    .email(email)
                    .passwordHash(passwordEncoder.encode(DEFAULT_PASSWORD))
                    .role(Role.GUARD)
                    .build();
            userRepository.save(guard);
            log.info("Created default guard: {}", email);
        }
    }

    private void seedHost() {
        String email = "host@college.edu";
        var existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            var user = existing.get();
            user.setPasswordHash(passwordEncoder.encode(DEFAULT_PASSWORD));
            userRepository.save(user);
            log.info("Reset password for existing host: {}", email);
        } else {
            Host host = Host.builder()
                    .name("Prof. John Host")
                    .email(email)
                    .passwordHash(passwordEncoder.encode(DEFAULT_PASSWORD))
                    .role(Role.HOST)
                    .build();
            userRepository.save(host);
            log.info("Created default host: {}", email);
        }
    }
}
