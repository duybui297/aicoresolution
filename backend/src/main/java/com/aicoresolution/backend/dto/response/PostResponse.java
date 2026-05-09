package com.aicoresolution.backend.dto.response;

import com.aicoresolution.backend.entity.ContentFormat;
import com.aicoresolution.backend.entity.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {
    private Long id;
    private String title;
    private String slug;
    private String excerpt;
    private String content;
    private ContentFormat contentFormat;
    private String thumbnailUrl;
    private String thumbnailAlt;
    private PostStatus status;
    private LocalDateTime publishedAt;
    private LocalDateTime scheduledAt;
    private String metaTitle;
    private String metaDescription;
    private String metaKeywords;
    private String canonicalUrl;
    private String robotsMeta;
    private String ogTitle;
    private String ogDescription;
    private String ogImage;
    private String ogType;
    private String twitterCard;
    private String twitterTitle;
    private String twitterDescription;
    private String twitterImage;
    private String schemaType;
    private Map<String, Object> schemaJson;
    private String locale;
    private Integer readingTime;
    private Integer wordCount;
    private Long viewCount;
    private Integer commentCount;
    private Boolean featured;
    private Boolean allowComments;
    private Long authorId;
    private String authorName;
    private Long createdById;
    private Long updatedById;
    private Long categoryId;
    private String categoryName;
    private String categorySlug;

    private List<Long> authorIds;
    private List<Long> categoryIds;
    private List<Long> tagIds;
    private List<PostMediaResponse> media;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime deletedAt;
}
