package com.aicoresolution.backend.dto.request;

import com.aicoresolution.backend.entity.MediaRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostMediaRequest {
    private Long mediaId;
    private Integer sortOrder;
    private MediaRole role;
}
