package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.VisitorRequest;
import com.college.visitorgatepass.dto.VisitorResponse;
import com.college.visitorgatepass.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
public class VisitorController {

    private final VisitorService visitorService;

    @Autowired
    public VisitorController(VisitorService visitorService) {
        this.visitorService = visitorService;
    }

    @PostMapping
    public ResponseEntity<VisitorResponse> createVisitor(@RequestBody VisitorRequest request) {
        VisitorResponse response = visitorService.createVisitor(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/request")
    public ResponseEntity<com.college.visitorgatepass.dto.VisitorResponseDTO> requestVisitor(
            @RequestBody com.college.visitorgatepass.dto.VisitorRequestDTO request) {
        com.college.visitorgatepass.dto.VisitorResponseDTO response = visitorService.requestVisitor(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<VisitorResponse>> getAllVisitors() {
        return ResponseEntity.ok(visitorService.getAllVisitors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VisitorResponse> getVisitorById(@PathVariable Long id) {
        return ResponseEntity.ok(visitorService.getVisitorById(id));
    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<VisitorResponse> getVisitorByPhone(@PathVariable String phone) {
        return ResponseEntity.ok(visitorService.getVisitorByPhone(phone));
    }

    @GetMapping("/host/{hostName}")
    public ResponseEntity<List<com.college.visitorgatepass.dto.VisitorRequestDetailsDTO>> getRequestsByHost(@PathVariable String hostName) {
        return ResponseEntity.ok(visitorService.getRequestsByHost(hostName));
    }

    @PutMapping("/request/{id}/status")
    public ResponseEntity<com.college.visitorgatepass.dto.VisitorRequestDetailsDTO> updateRequestStatus(
            @PathVariable Long id, 
            @RequestParam String status) {
        return ResponseEntity.ok(visitorService.updateRequestStatus(id, status));
    }

    @GetMapping("/hosts")
    public ResponseEntity<List<String>> getAllHosts() {
        return ResponseEntity.ok(visitorService.getAllHostNames());
    }
}
