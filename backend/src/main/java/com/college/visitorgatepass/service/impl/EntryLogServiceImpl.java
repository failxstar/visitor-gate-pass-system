package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.EntryLog;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.repository.EntryLogRepository;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.UserRepository;
import com.college.visitorgatepass.service.EntryLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EntryLogServiceImpl implements EntryLogService {

    @Autowired
    private EntryLogRepository entryLogRepository;

    @Autowired
    private GatePassRepository gatePassRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public EntryLog checkIn(Long gatePassId, String entryPoint, Long guardId) {
        GatePass gatePass = gatePassRepository.findById(gatePassId)
                .orElseThrow(() -> new ResourceNotFoundException("Gate pass not found with id: " + gatePassId));

        User guard = userRepository.findById(guardId)
                .orElseThrow(() -> new ResourceNotFoundException("Guard user not found with id: " + guardId));

        EntryLog entryLog = EntryLog.builder()
                .gatePass(gatePass)
                .entryPoint(entryPoint)
                .loggedBy(guard)
                .checkInTime(LocalDateTime.now())
                .build();

        return entryLogRepository.save(entryLog);
    }

    @Override
    public EntryLog checkOut(Long logId) {
        EntryLog entryLog = entryLogRepository.findById(logId)
                .orElseThrow(() -> new ResourceNotFoundException("Entry log not found with id: " + logId));

        entryLog.setCheckOutTime(LocalDateTime.now());
        return entryLogRepository.save(entryLog);
    }

    @Override
    public List<EntryLog> getAllEntryLogs() {
        return entryLogRepository.findAll();
    }

    @Override
    public List<EntryLog> getLogsByGatePassId(Long gatePassId) {
        return entryLogRepository.findByGatePassId(gatePassId);
    }
}
