package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.AuthRequest;
import com.college.visitorgatepass.dto.AuthResponse;
import com.college.visitorgatepass.dto.RegisterRequest;
import com.college.visitorgatepass.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody com.college.visitorgatepass.dto.AuthRequest request
    ) {
        return ResponseEntity.ok(service.login(request));
    }

}
