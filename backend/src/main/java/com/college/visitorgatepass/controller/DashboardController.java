package com.college.visitorgatepass.controller;

import com.college.visitorgatepass.dto.DashboardStatsDTO;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard/admin")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats() {
        DashboardStatsDTO stats = dashboardService.getAdminDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recent-activity")
    public ResponseEntity<List<GatePass>> getRecentActivity() {
        List<GatePass> recentPasses = dashboardService.getRecentGatePasses();
        return ResponseEntity.ok(recentPasses);
    }
}
