package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.AuthRequest;
import com.college.visitorgatepass.dto.AuthResponse;
import com.college.visitorgatepass.dto.RegisterRequest;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.repository.UserRepository;
import com.college.visitorgatepass.util.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        User user;
        switch (request.getRole()) {
            case ADMIN:
                user = com.college.visitorgatepass.model.entity.Admin.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .passwordHash(passwordEncoder.encode(request.getPassword()))
                        .role(request.getRole())
                        .build();
                break;
            case HOST:
                user = com.college.visitorgatepass.model.entity.Host.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .passwordHash(passwordEncoder.encode(request.getPassword()))
                        .role(request.getRole())
                        .build();
                break;
            case GUARD:
                user = com.college.visitorgatepass.model.entity.Guard.builder()
                        .name(request.getName())
                        .email(request.getEmail())
                        .passwordHash(passwordEncoder.encode(request.getPassword()))
                        .role(request.getRole())
                        .build();
                break;
            default:
                throw new IllegalArgumentException("Invalid role");
        }
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .name(user.getName())
                .email(user.getEmail())
                .id(user.getId())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .name(user.getName())
                .email(user.getEmail())
                .id(user.getId())
                .build();
    }
}
