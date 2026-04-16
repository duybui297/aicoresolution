package com.aicoresolution.backend.post.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;

public class BatchDeleteRequest {

    @NotEmpty(message = "IDs list cannot be empty")
    @Size(max = 50, message = "Maximum 50 posts per batch")
    private List<Long> ids;

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
}
