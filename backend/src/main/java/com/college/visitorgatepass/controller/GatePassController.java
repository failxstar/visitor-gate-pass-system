package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.service.GatePassService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/passes")
@RequiredArgsConstructor
public class GatePassController {

    private final GatePassService gatePassService;

    @PostMapping
    public ResponseEntity<GatePassResponse> createGatePass(@Valid @RequestBody GatePassRequest request) {
        return new ResponseEntity<>(gatePassService.createGatePass(request), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GatePassResponse>> getAllGatePasses() {
        return ResponseEntity.ok(gatePassService.getAllGatePasses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatePassResponse> getGatePassById(@PathVariable Long id) {
        return ResponseEntity.ok(gatePassService.getGatePassById(id));
    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<List<GatePassResponse>> getGatePassesByHostId(@PathVariable Long hostId) {
        return ResponseEntity.ok(gatePassService.getGatePassesByHostId(hostId));
    }

    @GetMapping("/visitor/{visitorId}")
    public ResponseEntity<List<GatePassResponse>> getGatePassesByVisitorId(@PathVariable Long visitorId) {
        return ResponseEntity.ok(gatePassService.getGatePassesByVisitorId(visitorId));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<GatePassResponse> updatePassStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusMap) {
        
        PassStatus status = PassStatus.valueOf(statusMap.get("status").toUpperCase());
        return ResponseEntity.ok(gatePassService.updatePassStatus(id, status));
    }

    /**
     * Public endpoint — no authentication required.
     * Visitor uses their secure token to track/view their gate pass.
     */
    @GetMapping("/track/{token}")
    public ResponseEntity<GatePassResponse> trackGatePass(@PathVariable String token) {
        return ResponseEntity.ok(gatePassService.getGatePassByToken(token));
    }
}
