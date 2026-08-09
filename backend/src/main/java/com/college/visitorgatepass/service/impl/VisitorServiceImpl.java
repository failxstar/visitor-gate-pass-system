package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.VisitorResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.repository.VisitorRequestRepository;
import com.college.visitorgatepass.model.entity.VisitorRequest;
import com.college.visitorgatepass.dto.VisitorRequestDTO;
import com.college.visitorgatepass.dto.VisitorResponseDTO;
import com.college.visitorgatepass.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;
    private final VisitorRequestRepository visitorRequestRepository;
    private final com.college.visitorgatepass.repository.UserRepository userRepository;

    @Autowired
    public VisitorServiceImpl(VisitorRepository visitorRepository, VisitorRequestRepository visitorRequestRepository, com.college.visitorgatepass.repository.UserRepository userRepository) {
        this.visitorRepository = visitorRepository;
        this.visitorRequestRepository = visitorRequestRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<String> getAllHostNames() {
        return userRepository.findByRole(com.college.visitorgatepass.model.enums.Role.HOST).stream()
                .map(com.college.visitorgatepass.model.entity.User::getName)
                .toList();
    }

    @Override
    public VisitorResponse createVisitor(com.college.visitorgatepass.dto.VisitorRequest request) {
        Visitor visitor = Visitor.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .idProofNumber(request.getIdProofNumber())
                .photoUrl(request.getPhotoUrl())
                .build();

        Visitor saved = visitorRepository.save(visitor);
        return mapToResponse(saved);
    }

    @Override
    public VisitorResponseDTO requestVisitor(VisitorRequestDTO request) {
        VisitorRequest visitorRequest = VisitorRequest.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .host(request.getHost())
                .visitDate(request.getVisitDate())
                .purpose(request.getPurpose())
                .status("PENDING")
                .build();

        visitorRequestRepository.save(visitorRequest);

        return VisitorResponseDTO.builder()
                .message("Request submitted successfully")
                .status("PENDING")
                .build();
    }

    @Override
    public List<VisitorResponse> getAllVisitors() {
        return visitorRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public VisitorResponse getVisitorById(Long id) {
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + id));
        return mapToResponse(visitor);
    }

    @Override
    public VisitorResponse getVisitorByPhone(String phone) {
        Visitor visitor = visitorRepository.findByPhone(phone)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with phone: " + phone));
        return mapToResponse(visitor);
    }

    private VisitorResponse mapToResponse(Visitor visitor) {
        return VisitorResponse.builder()
                .id(visitor.getId())
                .name(visitor.getName())
                .phone(visitor.getPhone())
                .idProofNumber(visitor.getIdProofNumber())
                .photoUrl(visitor.getPhotoUrl())
                .createdAt(visitor.getCreatedAt())
                .build();
    }

    @Override
    public List<com.college.visitorgatepass.dto.VisitorRequestDetailsDTO> getRequestsByHost(String host) {
        return visitorRequestRepository.findByHostOrderByIdDesc(host).stream()
                .map(this::mapToVisitorRequestDetailsDTO)
                .toList();
    }

    @Override
    public com.college.visitorgatepass.dto.VisitorRequestDetailsDTO updateRequestStatus(Long id, String status) {
        VisitorRequest request = visitorRequestRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Request not found with id: " + id));
        request.setStatus(status);
        VisitorRequest saved = visitorRequestRepository.save(request);
        return mapToVisitorRequestDetailsDTO(saved);
    }

    private com.college.visitorgatepass.dto.VisitorRequestDetailsDTO mapToVisitorRequestDetailsDTO(VisitorRequest request) {
        return com.college.visitorgatepass.dto.VisitorRequestDetailsDTO.builder()
                .id(request.getId())
                .name(request.getName())
                .phone(request.getPhone())
                .email(request.getEmail())
                .host(request.getHost())
                .visitDate(request.getVisitDate())
                .purpose(request.getPurpose())
                .status(request.getStatus())
                .createdAt(request.getCreatedAt())
                .build();
    }
}
