package com.aicoresolution.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostTranslationRequest {
    @NotNull
    private Long postId;

    @NotBlank
    @Size(max = 10)
    private String locale;

    @NotBlank
    @Size(max = 255)
    private String title;

    @NotBlank
    @Size(max = 255)
    @Pattern(regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$", message = "Slug must be lowercase and use hyphens only")
    private String slug;

    @Size(max = 500)
    private String excerpt;

    @NotBlank
    private String content;

    private String metaTitle;
    private String metaDescription;
    private String ogTitle;
    private String ogDescription;
}
