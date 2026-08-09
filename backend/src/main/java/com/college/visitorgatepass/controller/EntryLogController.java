package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.model.entity.EntryLog;
import com.college.visitorgatepass.service.EntryLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
public class EntryLogController {

    private final EntryLogService entryLogService;

    @Autowired
    public EntryLogController(EntryLogService entryLogService) {
        this.entryLogService = entryLogService;
    }

    @PostMapping("/check-in")
    public ResponseEntity<EntryLog> checkIn(@RequestParam Long gatePassId, @RequestParam String entryPoint, @RequestParam Long guardId) {
        EntryLog log = entryLogService.checkIn(gatePassId, entryPoint, guardId);
        return ResponseEntity.ok(log);
    }

    @PutMapping("/check-out/{logId}")
    public ResponseEntity<EntryLog> checkOut(@PathVariable Long logId) {
        EntryLog log = entryLogService.checkOut(logId);
        return ResponseEntity.ok(log);
    }

    @GetMapping
    public ResponseEntity<List<EntryLog>> getAllLogs() {
        return ResponseEntity.ok(entryLogService.getAllEntryLogs());
    }

    @GetMapping("/pass/{gatePassId}")
    public ResponseEntity<List<EntryLog>> getLogsByGatePassId(@PathVariable Long gatePassId) {
        return ResponseEntity.ok(entryLogService.getLogsByGatePassId(gatePassId));
    }
}
