package com.aicoresolution.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BatchDeleteRequest {

    @NotEmpty(message = "IDs list cannot be empty")
    @Size(max = 50, message = "Maximum 50 posts per batch")
    private List<Long> ids;
}
