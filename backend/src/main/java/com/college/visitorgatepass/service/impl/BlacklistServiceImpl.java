package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.exception.ResourceNotFoundException;
import com.college.visitorgatepass.model.entity.Blacklist;
import com.college.visitorgatepass.model.entity.User;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.repository.BlacklistRepository;
import com.college.visitorgatepass.repository.UserRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlacklistServiceImpl implements BlacklistService {

    @Autowired
    private BlacklistRepository blacklistRepository;

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Blacklist blacklistVisitor(Long visitorId, String reason, Long adminId) {
        Visitor visitor = visitorRepository.findById(visitorId)
                .orElseThrow(() -> new ResourceNotFoundException("Visitor not found with id: " + visitorId));

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin user not found with id: " + adminId));

        Blacklist blacklist = Blacklist.builder()
                .visitor(visitor)
                .reason(reason)
                .addedBy(admin)
                .build();

        return blacklistRepository.save(blacklist);
    }

    @Override
    public void removeFromBlacklist(Long blacklistId) {
        if (!blacklistRepository.existsById(blacklistId)) {
            throw new ResourceNotFoundException("Blacklist entry not found with id: " + blacklistId);
        }
        blacklistRepository.deleteById(blacklistId);
    }

    @Override
    public List<Blacklist> getAllBlacklistedVisitors() {
        return blacklistRepository.findAll();
    }

    @Override
    public boolean isBlacklisted(Long visitorId) {
        return blacklistRepository.existsByVisitorId(visitorId);
    }
}
