package com.college.visitorgatepass.util;

import com.college.visitorgatepass.model.enums.Role;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    public String generateToken(String email, Role role) {
        return "Bearer-mock-jwt-token-" + email + "-" + role;
    }

    public String extractEmail(String token) {
        if (token != null && token.startsWith("Bearer-mock-jwt-token-")) {
            String[] parts = token.split("-");
            if (parts.length >= 5) {
                return parts[4];
            }
        }
        return null;
    }

    public boolean validateToken(String token) {
        return token != null && token.startsWith("Bearer-mock-jwt-token-");
    }
}
