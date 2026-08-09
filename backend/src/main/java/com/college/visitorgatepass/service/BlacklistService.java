package com.college.visitorgatepass.service;

import com.college.visitorgatepass.model.entity.Blacklist;

import java.util.List;

public interface BlacklistService {
    Blacklist blacklistVisitor(Long visitorId, String reason, Long adminId);
    void removeFromBlacklist(Long blacklistId);
    List<Blacklist> getAllBlacklistedVisitors();
    boolean isBlacklisted(Long visitorId);
}
