package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.request.PostUpsertRequest;
import com.aicoresolution.backend.dto.response.PostResponse;
import org.springframework.data.domain.Page;
import java.util.List;

public interface IPostService {

    /**
     * Create new post
     */
    PostResponse create(PostUpsertRequest request, Long creatorId);

    /**
     * Update existing post
     */
    PostResponse update(Long id, PostUpsertRequest request, Long updaterId);

    /**
     * Delete post by id (soft delete)
     */
    void delete(Long id);

    /**
     * Delete multiple posts by ids (soft delete)
     */
    void deleteMultiple(List<Long> ids);

    /**
     * Get paginated list of posts (admin view)
     */
    Page<PostResponse> listAdmin(int page, int size);

    /**
     * Get single post by id (admin view)
     */
    PostResponse getAdminById(Long id);

    /**
     * Get single post by slug (public view)
     */
    PostResponse getPublicBySlug(String slug);

    /**
     * Get paginated list of published posts (public view)
     */
    Page<PostResponse> listPublic(int page, int size);
}
