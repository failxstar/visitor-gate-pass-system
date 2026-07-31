package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.repository.BlacklistRepository;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.UserRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.GatePassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GatePassServiceImpl implements GatePassService {

    @Autowired
    private GatePassRepository gatePassRepository;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BlacklistRepository blacklistRepository;

    @Override
    public GatePassResponse createGatePass(GatePassRequest request) {
        if (blacklistRepository.existsByVisitorId(request.getVisitorId())) {
            throw new IllegalArgumentException("Cannot create pass for blacklisted visitor!");
        }

        Visitor visitor = visitorRepository.findById(request.getVisitorId())
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + request.getVisitorId()));

        User host = userRepository.findById(request.getHostId())
                .orElseThrow(() -> new ResourceNotFoundException("Host not found with id: " + request.getHostId()));

        GatePass gatePass = GatePass.builder()
                .visitor(visitor)
                .host(host)
                .purpose(request.getPurpose())
                .validFrom(request.getValidFrom())
                .validTo(request.getValidTo())
                .status(PassStatus.PENDING)
                .build();

        GatePass saved = gatePassRepository.save(gatePass);
        return mapToResponse(saved);
    }

    @Override
    public List<GatePassResponse> getAllGatePasses() {
        return gatePassRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public GatePassResponse getGatePassById(Long id) {
        GatePass gatePass = gatePassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate pass not found with id: " + id));
        return mapToResponse(gatePass);
    }

    @Override
    public GatePassResponse updateStatus(Long id, PassStatus status) {
        GatePass gatePass = gatePassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate pass not found with id: " + id));
        gatePass.setStatus(status);
        GatePass updated = gatePassRepository.save(gatePass);
        return mapToResponse(updated);
    }

    @Override
    public List<GatePassResponse> getGatePassesByStatus(PassStatus status) {
        return gatePassRepository.findByStatus(status).stream()
                .map(this::mapToResponse)
                .toList();
    }

    private GatePassResponse mapToResponse(GatePass gatePass) {
        return GatePassResponse.builder()
                .id(gatePass.getId())
                .visitorId(gatePass.getVisitor().getId())
                .visitorName(gatePass.getVisitor().getName())
                .hostId(gatePass.getHost().getId())
                .hostName(gatePass.getHost().getName())
                .purpose(gatePass.getPurpose())
                .validFrom(gatePass.getValidFrom())
                .validTo(gatePass.getValidTo())
                .status(gatePass.getStatus())
                .createdAt(gatePass.getCreatedAt())
                .build();
    }
}
