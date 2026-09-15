package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.GatePassRequest;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.model.enums.PassStatus;

import java.util.List;

public interface GatePassService {
    GatePassResponse createGatePass(GatePassRequest request);
    GatePassResponse getGatePassById(Long id);
    List<GatePassResponse> getAllGatePasses();
    List<GatePassResponse> getGatePassesByHostId(Long hostId);
    List<GatePassResponse> getGatePassesByVisitorId(Long visitorId);
    GatePassResponse updatePassStatus(Long id, PassStatus status);
}
