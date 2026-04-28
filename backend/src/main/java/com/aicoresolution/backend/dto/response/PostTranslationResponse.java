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
public class PostTranslationResponse {
    private Long id;
    private Long postId;
    private String locale;
    private String title;
    private String slug;
    private String excerpt;
    private String content;
    private String metaTitle;
    private String metaDescription;
    private String ogTitle;
    private String ogDescription;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
