package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.BlacklistDTO;
import com.college.visitorgatepass.dto.BlacklistRequest;
import com.college.visitorgatepass.dto.MessageResponse;
import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.Admin;
import com.college.visitorgatepass.model.entity.Blacklist;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.repository.AdminRepository;
import com.college.visitorgatepass.repository.BlacklistRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.BlacklistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BlacklistServiceImpl implements BlacklistService {

    private final BlacklistRepository blacklistRepository;
    private final VisitorRepository visitorRepository;
    private final AdminRepository adminRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BlacklistDTO> getAllBlacklistedVisitors() {
        return blacklistRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MessageResponse addToBlacklist(BlacklistRequest request, String adminEmail) {
        if (blacklistRepository.existsByVisitorPhone(request.getVisitorPhone())) {
            return new MessageResponse("Visitor is already blacklisted.");
        }

        Visitor visitor = visitorRepository.findByPhone(request.getVisitorPhone())
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with phone: " + request.getVisitorPhone()));

        Admin admin = adminRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with email: " + adminEmail));

        Blacklist blacklist = Blacklist.builder()
                .visitor(visitor)
                .reason(request.getReason())
                .addedBy(admin)
                .build();

        blacklistRepository.save(blacklist);
        return new MessageResponse("Visitor successfully added to the blacklist.");
    }

    @Override
    public MessageResponse removeFromBlacklist(Long id) {
        if (!blacklistRepository.existsById(id)) {
            throw new ResourceNotFoundException("Blacklist entry not found with id: " + id);
        }
        blacklistRepository.deleteById(id);
        return new MessageResponse("Visitor removed from the blacklist.");
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isVisitorBlacklisted(String phone) {
        return blacklistRepository.existsByVisitorPhone(phone);
    }

    private BlacklistDTO mapToDTO(Blacklist blacklist) {
        return BlacklistDTO.builder()
                .id(blacklist.getId())
                .visitorId(blacklist.getVisitor().getId())
                .visitorName(blacklist.getVisitor().getName())
                .visitorPhone(blacklist.getVisitor().getPhone())
                .reason(blacklist.getReason())
                .addedByAdminName(blacklist.getAddedBy().getName())
                .createdAt(blacklist.getCreatedAt())
                .build();
    }
}
