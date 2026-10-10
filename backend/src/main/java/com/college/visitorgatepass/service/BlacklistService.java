package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.BlacklistDTO;
import com.college.visitorgatepass.dto.BlacklistRequest;
import com.college.visitorgatepass.dto.MessageResponse;

import java.util.List;

public interface BlacklistService {
    List<BlacklistDTO> getAllBlacklistedVisitors();
    MessageResponse addToBlacklist(BlacklistRequest request, String adminEmail);
    MessageResponse removeFromBlacklist(Long id);
    boolean isVisitorBlacklisted(String phone);
}
