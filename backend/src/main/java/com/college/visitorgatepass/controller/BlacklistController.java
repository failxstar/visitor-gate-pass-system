package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.model.entity.Blacklist;
import com.college.visitorgatepass.service.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blacklist")
public class BlacklistController {

    private final BlacklistService blacklistService;

    @Autowired
    public BlacklistController(BlacklistService blacklistService) {
        this.blacklistService = blacklistService;
    }

    @PostMapping
    public ResponseEntity<Blacklist> blacklistVisitor(@RequestParam Long visitorId, @RequestParam String reason, @RequestParam Long adminId) {
        Blacklist entry = blacklistService.blacklistVisitor(visitorId, reason, adminId);
        return ResponseEntity.ok(entry);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromBlacklist(@PathVariable Long id) {
        blacklistService.removeFromBlacklist(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Blacklist>> getAllBlacklistedVisitors() {
        return ResponseEntity.ok(blacklistService.getAllBlacklistedVisitors());
    }

    @GetMapping("/check/{visitorId}")
    public ResponseEntity<Boolean> isBlacklisted(@PathVariable Long visitorId) {
        return ResponseEntity.ok(blacklistService.isBlacklisted(visitorId));
    }
}
