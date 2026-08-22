package com.college.visitorgatepass.dto;

public class DashboardStatsDTO {
    private long totalVisitors;
    private long activeGatePasses;
    private long pendingApprovals;
    private long blacklistedCount;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(long totalVisitors, long activeGatePasses, long pendingApprovals, long blacklistedCount) {
        this.totalVisitors = totalVisitors;
        this.activeGatePasses = activeGatePasses;
        this.pendingApprovals = pendingApprovals;
        this.blacklistedCount = blacklistedCount;
    }

    public long getTotalVisitors() {
        return totalVisitors;
    }

    public void setTotalVisitors(long totalVisitors) {
        this.totalVisitors = totalVisitors;
    }

    public long getActiveGatePasses() {
        return activeGatePasses;
    }

    public void setActiveGatePasses(long activeGatePasses) {
        this.activeGatePasses = activeGatePasses;
    }

    public long getPendingApprovals() {
        return pendingApprovals;
    }

    public void setPendingApprovals(long pendingApprovals) {
        this.pendingApprovals = pendingApprovals;
    }

    public long getBlacklistedCount() {
        return blacklistedCount;
    }

    public void setBlacklistedCount(long blacklistedCount) {
        this.blacklistedCount = blacklistedCount;
    }
}
