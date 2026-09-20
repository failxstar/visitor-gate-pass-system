package com.college.visitorgatepass.service.impl;

import com.college.visitorgatepass.dto.DashboardStatsDTO;
import com.college.visitorgatepass.dto.GatePassResponse;
import com.college.visitorgatepass.model.entity.GatePass;
import com.college.visitorgatepass.model.entity.Host;
import com.college.visitorgatepass.model.entity.Visitor;
import com.college.visitorgatepass.model.enums.PassStatus;
import com.college.visitorgatepass.repository.BlacklistRepository;
import com.college.visitorgatepass.repository.GatePassRepository;
import com.college.visitorgatepass.repository.VisitorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DashboardServiceImplTest {

    @Mock
    private GatePassRepository gatePassRepository;

    @Mock
    private VisitorRepository visitorRepository;

    @Mock
    private BlacklistRepository blacklistRepository;

    @InjectMocks
    private DashboardServiceImpl dashboardService;

    @Test
    void getAdminDashboardStats_shouldReturnCorrectCounts() {
        when(visitorRepository.count()).thenReturn(10L);
        when(gatePassRepository.countByStatus(PassStatus.APPROVED)).thenReturn(4L);
        when(gatePassRepository.countByStatus(PassStatus.PENDING)).thenReturn(3L);
        when(blacklistRepository.count()).thenReturn(2L);

        DashboardStatsDTO result = dashboardService.getAdminDashboardStats();

        assertNotNull(result);
        assertEquals(10L, result.getTotalVisitors());
        assertEquals(4L, result.getActiveGatePasses());
        assertEquals(3L, result.getPendingApprovals());
        assertEquals(2L, result.getBlacklistedCount());

        verify(visitorRepository).count();
        verify(gatePassRepository).countByStatus(PassStatus.APPROVED);
        verify(gatePassRepository).countByStatus(PassStatus.PENDING);
        verify(blacklistRepository).count();
    }

    @Test
    void getRecentGatePasses_shouldReturnMappedPasses() {
        Visitor visitor = Visitor.builder()
                .id(1L)
                .name("Test Visitor")
                .phone("9876543210")
                .email("visitor@test.com")
                .build();

        Host host = Host.builder()
                .id(2L)
                .name("Test Host")
                .email("host@test.com")
                .build();

        GatePass gatePass = GatePass.builder()
                .id(100L)
                .visitor(visitor)
                .host(host)
                .purpose("Meeting")
                .status(PassStatus.APPROVED)
                .secureToken("test-token")
                .build();

        when(gatePassRepository.findTop5ByOrderByCreatedAtDesc())
                .thenReturn(List.of(gatePass));

        List<GatePassResponse> result = dashboardService.getRecentGatePasses();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(100L, result.get(0).getId());
        assertEquals("Test Visitor", result.get(0).getVisitorName());
        assertEquals("Test Host", result.get(0).getHostName());
        assertEquals("Meeting", result.get(0).getPurpose());
        assertEquals(PassStatus.APPROVED, result.get(0).getStatus());
        assertEquals("test-token", result.get(0).getSecureToken());

        verify(gatePassRepository).findTop5ByOrderByCreatedAtDesc();
    }
}
