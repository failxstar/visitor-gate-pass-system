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
public class BlacklistDTO {
    private Long id;
    private Long visitorId;
    private String visitorName;
    private String visitorPhone;
    private String reason;
    private String addedByAdminName;
    private LocalDateTime createdAt;
}
