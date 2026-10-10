package com.college.visitorgatepass.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EntryLogDTO {
    private Long id;
    private Long gatePassId;
    private String visitorName;
    private String visitorPhone;
    private String hostName;
    private String purpose;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String entryPoint;
    private String guardName;
}
