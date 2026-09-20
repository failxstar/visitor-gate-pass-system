package com.college.visitorgatepass.service;

import com.college.visitorgatepass.dto.DashboardStatsDTO;
import com.college.visitorgatepass.model.entity.GatePass;

import com.college.visitorgatepass.dto.GatePassResponse;

import java.util.List;

public interface DashboardService {
    DashboardStatsDTO getAdminDashboardStats();
    List<GatePassResponse> getRecentGatePasses();
}
