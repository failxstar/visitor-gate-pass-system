package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.HostRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.GatePassService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatePassServiceImpl implements GatePassService {

    private final GatePassRepository gatePassRepository;
    private final VisitorRepository visitorRepository;
    private final HostRepository hostRepository;

    @Override
    @Transactional
    public GatePassResponse createGatePass(GatePassRequest request) {
        Visitor visitor = visitorRepository.findById(request.getVisitorId())
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + request.getVisitorId()));

        Host host = hostRepository.findById(request.getHostId())
                .orElseThrow(() -> new ResourceNotFoundException("Host not found with id: " + request.getHostId()));

        GatePass gatePass = GatePass.builder()
                .visitor(visitor)
                .host(host)
                .purpose(request.getPurpose())
                .validFrom(request.getValidFrom())
                .validTo(request.getValidTo())
                .status(PassStatus.PENDING)
                .build();

        GatePass savedPass = gatePassRepository.save(gatePass);
        return mapToResponse(savedPass);
    }

    @Override
    public GatePassResponse getGatePassById(Long id) {
        GatePass gatePass = gatePassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate Pass not found with id: " + id));
        return mapToResponse(gatePass);
    }

    @Override
    public List<GatePassResponse> getAllGatePasses() {
        return gatePassRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<GatePassResponse> getGatePassesByHostId(Long hostId) {
        return gatePassRepository.findByHostIdOrderByCreatedAtDesc(hostId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<GatePassResponse> getGatePassesByVisitorId(Long visitorId) {
        return gatePassRepository.findByVisitorIdOrderByCreatedAtDesc(visitorId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GatePassResponse updatePassStatus(Long id, PassStatus status) {
        GatePass gatePass = gatePassRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gate Pass not found with id: " + id));
        
        gatePass.setStatus(status);
        GatePass updatedPass = gatePassRepository.save(gatePass);
        return mapToResponse(updatedPass);
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
