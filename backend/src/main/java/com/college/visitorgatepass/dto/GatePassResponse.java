package com.college.visitorgatepass.dto;

import com.college.visitorgatepass.model.enums.PassStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GatePassResponse {
    private Long id;
    private Long visitorId;
    private String visitorName;
    private Long hostId;
    private String hostName;
    private String purpose;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
    private PassStatus status;
    private LocalDateTime createdAt;
}
