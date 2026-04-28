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
public class PostRevisionResponse {
    private Long id;
    private Long postId;
    private String title;
    private String excerpt;
    private String content;
    private String metaTitle;
    private String metaDescription;
    private String changeNote;
    private Long editedById;
    private String editedByFullName;
    private LocalDateTime createdAt;
}
