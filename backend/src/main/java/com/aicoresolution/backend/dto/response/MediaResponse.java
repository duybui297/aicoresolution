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
public class MediaResponse {
    private Long id;
    private String fileUrl;
    private String fileName;
    private Long fileSize;
    private String altText;
    private String caption;
    private Integer width;
    private Integer height;
    private LocalDateTime createdAt;
}
