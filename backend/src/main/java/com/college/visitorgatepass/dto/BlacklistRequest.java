package com.college.visitorgatepass.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BlacklistRequest {
    @NotBlank(message = "Visitor phone is required")
    private String visitorPhone;

    @NotBlank(message = "Reason is required")
    private String reason;
}
