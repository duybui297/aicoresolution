package com.aicoresolution.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {

    @NotBlank
    @Size(max = 150)
    private String name;

    @NotBlank
    @Size(max = 200)
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "Slug must be lowercase and use hyphens only")
    private String slug;

    @Size(max = 500)
    private String description;

    @Size(max = 500)
    private String thumbnailUrl;

    private Long parentId;

    private String metaTitle;
    private String metaDescription;
    private String canonicalUrl;
    private String ogImage;
    private String robotsMeta;
    private Integer sortOrder;
    @Builder.Default
    private Boolean isActive = true;
}
