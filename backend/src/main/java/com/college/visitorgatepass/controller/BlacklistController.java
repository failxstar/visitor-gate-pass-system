package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.BlacklistDTO;
import com.college.visitorgatepass.dto.BlacklistRequest;
import com.college.visitorgatepass.dto.MessageResponse;
import com.college.visitorgatepass.service.BlacklistService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/blacklist")
@RequiredArgsConstructor
public class BlacklistController {

    private final BlacklistService blacklistService;

    @GetMapping
    public ResponseEntity<List<BlacklistDTO>> getAllBlacklistedVisitors() {
        return ResponseEntity.ok(blacklistService.getAllBlacklistedVisitors());
    }

    @PostMapping
    public ResponseEntity<MessageResponse> addToBlacklist(
            @Valid @RequestBody BlacklistRequest request,
            Authentication authentication) {
        String adminEmail = authentication.getName();
        return ResponseEntity.ok(blacklistService.addToBlacklist(request, adminEmail));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> removeFromBlacklist(@PathVariable Long id) {
        return ResponseEntity.ok(blacklistService.removeFromBlacklist(id));
    }
}
