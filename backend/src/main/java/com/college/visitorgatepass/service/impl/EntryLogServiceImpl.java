package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.EntryLogDTO;
import com.college.visitorgatepass.model.entity.EntryLog;
import com.college.visitorgatepass.repository.EntryLogRepository;
import com.college.visitorgatepass.service.EntryLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EntryLogServiceImpl implements EntryLogService {

    private final EntryLogRepository entryLogRepository;

    @Override
    public List<EntryLogDTO> getAllEntryLogs() {
        List<EntryLog> logs = entryLogRepository.findAll(Sort.by(Sort.Direction.DESC, "checkInTime"));
        return logs.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public List<EntryLogDTO> getRecentEntryLogs(int limit) {
        Page<EntryLog> page = entryLogRepository.findAll(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "checkInTime")));
        return page.getContent().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    private EntryLogDTO mapToDTO(EntryLog log) {
        return EntryLogDTO.builder()
                .id(log.getId())
                .gatePassId(log.getGatePass().getId())
                .visitorName(log.getGatePass().getVisitor().getName())
                .visitorPhone(log.getGatePass().getVisitor().getPhone())
                .hostName(log.getGatePass().getHost().getName())
                .purpose(log.getGatePass().getPurpose())
                .checkInTime(log.getCheckInTime())
                .checkOutTime(log.getCheckOutTime())
                .entryPoint(log.getEntryPoint())
                .guardName(log.getLoggedBy().getName())
                .build();
    }
}
