package com.aicoresolution.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedirectResponse {
    private Long id;
    private String fromPath;
    private String toPath;
    private Short statusCode;
    private Long hitCount;
    private Boolean isActive;
    private String note;
    private LocalDateTime createdAt;
}
