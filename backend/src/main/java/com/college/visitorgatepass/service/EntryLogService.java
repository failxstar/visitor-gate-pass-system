package com.college.visitorgatepass.service;

import com.college.visitorgatepass.model.entity.EntryLog;

import java.util.List;

public interface EntryLogService {
    EntryLog checkIn(Long gatePassId, String entryPoint, Long guardId);
    EntryLog checkOut(Long logId);
    List<EntryLog> getAllEntryLogs();
    List<EntryLog> getLogsByGatePassId(Long gatePassId);
}
