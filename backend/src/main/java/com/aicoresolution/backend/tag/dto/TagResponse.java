package com.aicoresolution.backend.tag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TagResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private String metaTitle;
    private String metaDescription;
    private LocalDateTime createdAt;
}
