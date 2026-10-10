package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.EntryLogDTO;
import java.util.List;

public interface EntryLogService {
    List<EntryLogDTO> getAllEntryLogs();
    List<EntryLogDTO> getRecentEntryLogs(int limit);
}
