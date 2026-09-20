package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.VisitorRequestDTO;
import com.college.visitorgatepass.dto.VisitorResponseDTO;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.VisitorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;

    @Override
    public VisitorResponseDTO createVisitor(VisitorRequestDTO dto) {
        if (visitorRepository.existsByPhone(dto.getPhone())) {
            throw new RuntimeException("Visitor with this phone number already exists.");
        }

        Visitor visitor = Visitor.builder()
                .name(dto.getName())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .idProofNumber(dto.getIdProofNumber())
                .photoUrl(dto.getPhotoUrl())
                .build();

        Visitor savedVisitor = visitorRepository.save(visitor);
        return mapToDTO(savedVisitor);
    }

    @Override
    public List<VisitorResponseDTO> getAllVisitors() {
        return visitorRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VisitorResponseDTO getVisitorById(Long id) {
        Visitor visitor = visitorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));
        return mapToDTO(visitor);
    }

    @Override
    public VisitorResponseDTO getVisitorByPhone(String phone) {
        Visitor visitor = visitorRepository.findByPhone(phone)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));
        return mapToDTO(visitor);
    }

    private VisitorResponseDTO mapToDTO(Visitor visitor) {
        return VisitorResponseDTO.builder()
                .id(visitor.getId())
                .name(visitor.getName())
                .phone(visitor.getPhone())
                .email(visitor.getEmail())
                .idProofNumber(visitor.getIdProofNumber())
                .photoUrl(visitor.getPhotoUrl())
                .createdAt(visitor.getCreatedAt())
                .build();
    }
}
