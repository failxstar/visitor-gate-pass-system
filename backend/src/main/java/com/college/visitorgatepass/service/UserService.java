package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.LoginRequest;
import com.college.visitorgatepass.dto.LoginResponse;
import com.college.visitorgatepass.dto.RegisterRequest;
import com.college.visitorgatepass.model.entity.User;

import java.util.List;

public interface UserService {
    LoginResponse login(LoginRequest request);
    User register(RegisterRequest request);
    List<User> getAllUsers();
    User getUserById(Long id);
    User getUserByEmail(String email);
}
