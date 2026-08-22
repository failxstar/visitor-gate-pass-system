package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.DashboardStatsDTO;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.repository.BlacklistRepository;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import com.college.visitorgatepass.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final GatePassRepository gatePassRepository;
    private final VisitorRepository visitorRepository;
    private final BlacklistRepository blacklistRepository;

    @Autowired
    public DashboardServiceImpl(GatePassRepository gatePassRepository,
                                VisitorRepository visitorRepository,
                                BlacklistRepository blacklistRepository) {
        this.gatePassRepository = gatePassRepository;
        this.visitorRepository = visitorRepository;
        this.blacklistRepository = blacklistRepository;
    }

    @Override
    public DashboardStatsDTO getAdminDashboardStats() {
        long totalVisitors = visitorRepository.count();
        long activeGatePasses = gatePassRepository.countByStatus(PassStatus.APPROVED);
        long pendingApprovals = gatePassRepository.countByStatus(PassStatus.PENDING);
        long blacklistedCount = blacklistRepository.count();

        return new DashboardStatsDTO(totalVisitors, activeGatePasses, pendingApprovals, blacklistedCount);
    }

    @Override
    public List<GatePass> getRecentGatePasses() {
        return gatePassRepository.findTop5ByOrderByCreatedAtDesc();
    }
}
