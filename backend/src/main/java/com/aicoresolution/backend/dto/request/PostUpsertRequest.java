package com.aicoresolution.backend.dto.request;

import com.aicoresolution.backend.entity.ContentFormat;
import com.aicoresolution.backend.entity.PostStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostUpsertRequest {

    @Size(max = 255)
    private String title;

    @Size(max = 255)
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "Slug must be lowercase and use hyphens only")
    private String slug;

    @Size(max = 500)
    private String excerpt;

    private String content;

    private ContentFormat contentFormat;

    @Size(max = 500)
    private String thumbnailUrl;

    @Size(max = 300)
    private String thumbnailAlt;

    private PostStatus status;

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

    @Size(max = 500)
    private String changeNote;
}
