package com.aicoresolution.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedirectRequest {
    @NotBlank(message = "From path is required")
    @Size(max = 500)
    private String fromPath;

    @NotBlank(message = "To path is required")
    @Size(max = 500)
    private String toPath;

    private Short statusCode;

    @Size(max = 255)
    private String note;

    private Boolean isActive;
}
