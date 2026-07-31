package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.model.enums.PassStatus;

import java.util.List;

public interface GatePassService {
    GatePassResponse createGatePass(GatePassRequest request);
    List<GatePassResponse> getAllGatePasses();
    GatePassResponse getGatePassById(Long id);
    GatePassResponse updateStatus(Long id, PassStatus status);
    List<GatePassResponse> getGatePassesByStatus(PassStatus status);
}
