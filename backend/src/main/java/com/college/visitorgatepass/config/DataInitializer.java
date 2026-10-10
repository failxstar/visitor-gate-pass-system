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

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) {
        seedAdmin();
        seedGuard();
        seedHost();
    }

    private void seedAdmin() {
        if (userRepository.findByEmail("admin@college.edu").isEmpty()) {
            Admin admin = Admin.builder()
                    .name("System Admin")
                    .email("admin@college.edu")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("Seeded default admin account: admin@college.edu");
        } else {
            log.info("Admin account already exists, skipping seed.");
        }
    }

    private void seedGuard() {
        if (userRepository.findByEmail("guard@college.edu").isEmpty()) {
            Guard guard = Guard.builder()
                    .name("Security Guard")
                    .email("guard@college.edu")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(Role.GUARD)
                    .build();
            userRepository.save(guard);
            log.info("Seeded default guard account: guard@college.edu");
        } else {
            log.info("Guard account already exists, skipping seed.");
        }
    }

    private void seedHost() {
        if (userRepository.findByEmail("host@college.edu").isEmpty()) {
            Host host = Host.builder()
                    .name("Prof. John Host")
                    .email("host@college.edu")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .role(Role.HOST)
                    .build();
            userRepository.save(host);
            log.info("Seeded default host account: host@college.edu");
        } else {
            log.info("Host account already exists, skipping seed.");
        }
    }
}
