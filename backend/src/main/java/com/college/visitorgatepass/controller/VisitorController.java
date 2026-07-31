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
}
