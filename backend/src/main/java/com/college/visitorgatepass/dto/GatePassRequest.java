package com.college.visitorgatepass.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GatePassRequest {
    private Long visitorId;
    private Long hostId;
    private String purpose;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;
}
