package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.LoginRequest;
import com.college.visitorgatepass.dto.LoginResponse;
import com.college.visitorgatepass.dto.RegisterRequest;
import com.college.visitorgatepass.dto.UserResponseDTO;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.exception.UnauthorizedException;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.model.enums.Role;
import com.college.visitorgatepass.repository.UserRepository;
import com.college.visitorgatepass.util.JwtUtil;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    void login_shouldReturnLoginResponseForValidCredentials() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@test.com");
        request.setPassword("password");

        Host user = Host.builder()
                .id(1L)
                .name("Test User")
                .email("user@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.findByEmail("user@test.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password", "encoded-password"))
                .thenReturn(true);
        when(jwtUtil.generateToken("user@test.com", Role.HOST))
                .thenReturn("jwt-token");

        LoginResponse response = userService.login(request);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(1L, response.getId());
        assertEquals("Test User", response.getName());
        assertEquals("user@test.com", response.getEmail());
        assertEquals(Role.HOST, response.getRole());
    }

    @Test
    void login_shouldRejectInvalidPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("user@test.com");
        request.setPassword("wrong");

        Host user = Host.builder()
                .id(1L)
                .name("Test User")
                .email("user@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.findByEmail("user@test.com"))
                .thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "encoded-password"))
                .thenReturn(false);

        assertThrows(
                UnauthorizedException.class,
                () -> userService.login(request)
        );

        verify(jwtUtil, never())
                .generateToken(anyString(), any(Role.class));
    }

    @Test
    void register_shouldCreateUserWithEncodedPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setName("New Host");
        request.setEmail("newhost@test.com");
        request.setPassword("password");
        request.setRole(Role.HOST);

        when(userRepository.findByEmail("newhost@test.com"))
                .thenReturn(Optional.empty());

        when(passwordEncoder.encode("password"))
                .thenReturn("encoded-password");

        Host savedUser = Host.builder()
                .id(2L)
                .name("New Host")
                .email("newhost@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.save(any(User.class)))
                .thenReturn(savedUser);

        User result = userService.register(request);

        assertNotNull(result);
        assertEquals("New Host", result.getName());
        assertEquals("newhost@test.com", result.getEmail());
        assertEquals("encoded-password", result.getPasswordHash());

        verify(passwordEncoder).encode("password");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_shouldRejectDuplicateEmail() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Existing User");
        request.setEmail("existing@test.com");
        request.setPassword("password");
        request.setRole(Role.HOST);

        Host existingUser = Host.builder()
                .id(1L)
                .name("Existing User")
                .email("existing@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.findByEmail("existing@test.com"))
                .thenReturn(Optional.of(existingUser));

        assertThrows(
                IllegalArgumentException.class,
                () -> userService.register(request)
        );

        verify(userRepository, never())
                .save(any(User.class));
    }

    @Test
    void getAllUsers_shouldReturnUsers() {
        Host user = Host.builder()
                .id(1L)
                .name("Test User")
                .email("user@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.findAll())
                .thenReturn(List.of(user));

        List<User> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("Test User", result.get(0).getName());

        verify(userRepository).findAll();
    }

    @Test
    void getUserById_shouldReturnUser() {
        Host user = Host.builder()
                .id(1L)
                .name("Test User")
                .email("user@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test User", result.getName());
    }

    @Test
    void getUserById_shouldThrowWhenUserDoesNotExist() {
        when(userRepository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> userService.getUserById(99L)
        );
    }

    @Test
    void getAllHosts_shouldReturnOnlyHosts() {
        Host host = Host.builder()
                .id(2L)
                .name("Test Host")
                .email("host@test.com")
                .passwordHash("encoded-password")
                .role(Role.HOST)
                .build();

        when(userRepository.findByRole(Role.HOST))
                .thenReturn(List.of(host));

        List<UserResponseDTO> result = userService.getAllHosts();

        assertEquals(1, result.size());
        assertEquals("Test Host", result.get(0).getName());
        assertEquals("host@test.com", result.get(0).getEmail());
        assertEquals("HOST", result.get(0).getRole());

        verify(userRepository).findByRole(Role.HOST);
    }
}
