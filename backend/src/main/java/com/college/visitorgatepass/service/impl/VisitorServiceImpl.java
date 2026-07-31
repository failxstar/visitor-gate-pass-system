package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.VisitorRequest;
import com.college.visitorgatepass.dto.VisitorResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;

    @Autowired
    public VisitorServiceImpl(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    @Override
    public VisitorResponse createVisitor(VisitorRequest request) {
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
}
