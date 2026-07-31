package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.service.GatePassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/passes")
public class GatePassController {

    private final GatePassService gatePassService;

    @Autowired
    public GatePassController(GatePassService gatePassService) {
        this.gatePassService = gatePassService;
    }

    @PostMapping
    public ResponseEntity<GatePassResponse> createGatePass(@RequestBody GatePassRequest request) {
        GatePassResponse response = gatePassService.createGatePass(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<GatePassResponse>> getAllGatePasses() {
        return ResponseEntity.ok(gatePassService.getAllGatePasses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GatePassResponse> getGatePassById(@PathVariable Long id) {
        return ResponseEntity.ok(gatePassService.getGatePassById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<GatePassResponse> updateStatus(@PathVariable Long id, @RequestParam PassStatus status) {
        return ResponseEntity.ok(gatePassService.updateStatus(id, status));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<GatePassResponse>> getGatePassesByStatus(@PathVariable PassStatus status) {
        return ResponseEntity.ok(gatePassService.getGatePassesByStatus(status));
    }
}
