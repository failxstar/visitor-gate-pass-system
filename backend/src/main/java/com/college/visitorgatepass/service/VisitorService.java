package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.VisitorRequest;
import com.college.visitorgatepass.dto.VisitorResponse;

import java.util.List;

public interface VisitorService {
    VisitorResponse createVisitor(VisitorRequest request);
    List<VisitorResponse> getAllVisitors();
    VisitorResponse getVisitorById(Long id);
    VisitorResponse getVisitorByPhone(String phone);
}
