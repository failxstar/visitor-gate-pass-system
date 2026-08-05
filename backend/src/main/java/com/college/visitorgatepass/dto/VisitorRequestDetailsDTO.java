package com.college.visitorgatepass.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorRequestDetailsDTO {
    private Long id;
    private String name;
    private String phone;
    private String email;
    private String host;
    private LocalDate visitDate;
    private String purpose;
    private String status;
    private LocalDateTime createdAt;
}
