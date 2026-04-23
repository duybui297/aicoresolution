package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.request.TagRequest;
import com.aicoresolution.backend.dto.response.TagResponse;

import org.springframework.data.domain.Page;

public interface ITagService {

    /**
     * Create new tag
     */
    TagResponse create(TagRequest request);

    /**
     * Update existing tag
     */
    TagResponse update(Long id, TagRequest request);

    /**
     * Delete tag by id
     */
    void delete(Long id);

    /**
     * Get paginated list of tags
     */
    Page<TagResponse> list(int page, int size);

    /**
     * Get single tag by id
     */
    TagResponse getById(Long id);

    /**
     * Get tag by slug
     */
    TagResponse getBySlug(String slug);
}
