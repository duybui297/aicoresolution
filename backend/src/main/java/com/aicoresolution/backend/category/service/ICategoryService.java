package com.aicoresolution.backend.category.service;

import com.aicoresolution.backend.category.dto.CategoryRequest;
import com.aicoresolution.backend.category.dto.CategoryResponse;
import org.springframework.data.domain.Page;

public interface ICategoryService {

    /**
     * Create new category
     */
    CategoryResponse create(CategoryRequest request);

    /**
     * Update existing category
     */
    CategoryResponse update(Long id, CategoryRequest request);

    /**
     * Delete category by id
     */
    void delete(Long id);

    /**
     * Get paginated list of categories
     */
    Page<CategoryResponse> list(int page, int size);

    /**
     * Get single category by id
     */
    CategoryResponse getById(Long id);

    /**
     * Get category by slug
     */
    CategoryResponse getBySlug(String slug);
}
