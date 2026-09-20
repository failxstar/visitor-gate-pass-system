package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.VisitorRequestDTO;
import com.college.visitorgatepass.dto.VisitorResponseDTO;
import com.college.visitorgatepass.service.VisitorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
@RequiredArgsConstructor
public class VisitorController {

    private final VisitorService visitorService;
    private final com.college.visitorgatepass.service.UserService userService;

    @GetMapping("/hosts")
    public ResponseEntity<List<com.college.visitorgatepass.dto.UserResponseDTO>> getAllHosts() {
        return ResponseEntity.ok(userService.getAllHosts());
    }

    @PostMapping("/request")
    public ResponseEntity<VisitorResponseDTO> registerVisitor(@Valid @RequestBody VisitorRequestDTO visitorRequestDTO) {
        VisitorResponseDTO createdVisitor = visitorService.createVisitor(visitorRequestDTO);
        return new ResponseEntity<>(createdVisitor, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<VisitorResponseDTO>> getAllVisitors() {
        List<VisitorResponseDTO> visitors = visitorService.getAllVisitors();
        return ResponseEntity.ok(visitors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitorResponseDTO> getVisitorById(@PathVariable Long id) {
        VisitorResponseDTO visitor = visitorService.getVisitorById(id);
        return ResponseEntity.ok(visitor);
    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<VisitorResponseDTO> getVisitorByPhone(@PathVariable String phone) {
        VisitorResponseDTO visitor = visitorService.getVisitorByPhone(phone);
        return ResponseEntity.ok(visitor);
    }
}
