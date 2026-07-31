package com.college.visitorgatepass.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorRequest {
    private String name;
    private String phone;
    private String idProofNumber;
    private String photoUrl;
}
