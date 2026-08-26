package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.VisitorRequestDTO;
import com.college.visitorgatepass.dto.VisitorResponseDTO;

import java.util.List;

public interface VisitorService {
    VisitorResponseDTO createVisitor(VisitorRequestDTO visitorRequestDTO);
    List<VisitorResponseDTO> getAllVisitors();
    VisitorResponseDTO getVisitorById(Long id);
    VisitorResponseDTO getVisitorByPhone(String phone);
}
