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
public class VisitorResponseDTO {

    private Long id;
    private String name;
    private String phone;
    private String idProofNumber;
    private String photoUrl;
    private LocalDateTime createdAt;
}
