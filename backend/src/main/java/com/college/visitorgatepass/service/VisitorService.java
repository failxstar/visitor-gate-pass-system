package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.VisitorRequest;
import com.college.visitorgatepass.dto.VisitorResponse;

import java.util.List;

public interface VisitorService {
    VisitorResponse createVisitor(VisitorRequest request);
    com.college.visitorgatepass.dto.VisitorResponseDTO requestVisitor(com.college.visitorgatepass.dto.VisitorRequestDTO request);
    List<VisitorResponse> getAllVisitors();
    VisitorResponse getVisitorById(Long id);
    VisitorResponse getVisitorByPhone(String phone);
    List<com.college.visitorgatepass.dto.VisitorRequestDetailsDTO> getRequestsByHost(String host);
    com.college.visitorgatepass.dto.VisitorRequestDetailsDTO updateRequestStatus(Long id, String status);
    List<String> getAllHostNames();
}
