package com.college.visitorgatepass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.college.visitorgatepass.repository.UserRepository;

@SpringBootApplication
public class VisitorGatePassApplication {

    public static void main(String[] args) {
        SpringApplication.run(VisitorGatePassApplication.class, args);
    }

    @Bean
    public CommandLineRunner dropConstraint(org.springframework.jdbc.core.JdbcTemplate jdbcTemplate) {
        return args -> {
            try {
                jdbcTemplate.execute("ALTER TABLE gate_passes DROP CONSTRAINT IF EXISTS gate_passes_status_check;");
                System.out.println("Constraint dropped successfully!");
            } catch (Exception e) {
                System.out.println("Constraint might not exist or failed to drop: " + e.getMessage());
            }
        };
    }
}
