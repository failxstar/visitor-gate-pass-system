package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.AuthRequest;
import com.college.visitorgatepass.dto.AuthResponse;
import com.college.visitorgatepass.dto.RegisterRequest;
import com.college.visitorgatepass.model.entity.Admin;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.model.enums.Role;
import com.college.visitorgatepass.repository.UserRepository;
import com.college.visitorgatepass.util.JwtService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthService authService;

    @Test
    void register_shouldCreateHostAndReturnAuthResponse() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Test Host");
        request.setEmail("host@test.com");
        request.setPassword("password");
        request.setRole(Role.HOST);

        when(passwordEncoder.encode("password"))
                .thenReturn("encoded-password");

        Host savedHost = Host.builder()
                .id(1L)
                .name("Test Host")
                .email("host@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(repository.save(any(User.class)))
                .thenReturn(savedHost);

        when(jwtService.generateToken(any(User.class)))
                .thenReturn("jwt-token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("HOST", response.getRole());
        assertEquals("Test Host", response.getName());
        assertEquals("host@test.com", response.getEmail());
        assertNull(response.getId());

        verify(passwordEncoder).encode("password");
        verify(repository).save(any(User.class));
        verify(jwtService).generateToken(any(User.class));
    }

    @Test
    void register_shouldCreateAdmin() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Test Admin");
        request.setEmail("admin@test.com");
        request.setPassword("password");
        request.setRole(Role.ADMIN);

        when(passwordEncoder.encode("password"))
                .thenReturn("encoded-password");

        Admin savedAdmin = Admin.builder()
                .id(2L)
                .name("Test Admin")
                .email("admin@test.com")
                .passwordHash("encoded-password")
                .role(Role.ADMIN)
                .build();

        when(repository.save(any(User.class)))
                .thenReturn(savedAdmin);

        when(jwtService.generateToken(any(User.class)))
                .thenReturn("admin-token");

        AuthResponse response = authService.register(request);

        assertEquals("admin-token", response.getToken());
        assertEquals("ADMIN", response.getRole());
        assertEquals("Test Admin", response.getName());

        verify(repository).save(any(User.class));
    }

    @Test
    void register_shouldCreateGuard() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Test Guard");
        request.setEmail("guard@test.com");
        request.setPassword("password");
        request.setRole(Role.GUARD);

        when(passwordEncoder.encode("password"))
                .thenReturn("encoded-password");

        com.college.visitorgatepass.model.entity.Guard savedGuard =
                com.college.visitorgatepass.model.entity.Guard.builder()
                        .id(3L)
                        .name("Test Guard")
                        .email("guard@test.com")
                        .passwordHash("encoded-password")
                        .role(Role.GUARD)
                        .build();

        when(repository.save(any(User.class)))
                .thenReturn(savedGuard);

        when(jwtService.generateToken(any(User.class)))
                .thenReturn("guard-token");

        AuthResponse response = authService.register(request);

        assertEquals("guard-token", response.getToken());
        assertEquals("GUARD", response.getRole());
        assertEquals("Test Guard", response.getName());

        verify(repository).save(any(User.class));
    }

    @Test
    void login_shouldAuthenticateAndReturnToken() {
        AuthRequest request = new AuthRequest();
        request.setEmail("host@test.com");
        request.setPassword("password");

        Host host = Host.builder()
                .id(1L)
                .name("Test Host")
                .email("host@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(repository.findByEmail("host@test.com"))
                .thenReturn(Optional.of(host));

        when(jwtService.generateToken(host))
                .thenReturn("jwt-token");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("HOST", response.getRole());
        assertEquals("Test Host", response.getName());
        assertEquals("host@test.com", response.getEmail());
        assertEquals(1L, response.getId());

        verify(authenticationManager).authenticate(any(
                UsernamePasswordAuthenticationToken.class
        ));

        verify(repository).findByEmail("host@test.com");
        verify(jwtService).generateToken(host);
    }

    @Test
    void login_shouldThrowWhenUserDoesNotExist() {
        AuthRequest request = new AuthRequest();
        request.setEmail("missing@test.com");
        request.setPassword("password");

        when(repository.findByEmail("missing@test.com"))
                .thenReturn(Optional.empty());

        assertThrows(
                java.util.NoSuchElementException.class,
                () -> authService.login(request)
        );

        verify(authenticationManager).authenticate(any(
                UsernamePasswordAuthenticationToken.class
        ));

        verify(jwtService, never()).generateToken(any(User.class));
    }
}
