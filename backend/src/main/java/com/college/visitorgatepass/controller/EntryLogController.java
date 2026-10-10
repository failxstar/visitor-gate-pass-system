package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.EntryLogDTO;
import com.college.visitorgatepass.service.EntryLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/entry-logs")
@RequiredArgsConstructor
public class EntryLogController {

    private final EntryLogService entryLogService;

    @GetMapping
    public ResponseEntity<List<EntryLogDTO>> getAllLogs(
            @RequestParam(required = false) Integer limit) {
        if (limit != null && limit > 0) {
            return ResponseEntity.ok(entryLogService.getRecentEntryLogs(limit));
        }
        return ResponseEntity.ok(entryLogService.getAllEntryLogs());
    }
}
