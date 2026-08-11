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
}
