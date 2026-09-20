package com.college.visitorgatepass.dto;

import com.college.visitorgatepass.model.enums.PassStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VerificationResponse {
    private boolean valid;
    private String message;
    private Long gatePassId;
    private String visitorName;
    private String visitorPhone;
    private String hostName;
    private String purpose;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
    private PassStatus status;
    private boolean alreadyCheckedIn;
}
