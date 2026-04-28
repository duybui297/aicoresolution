package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.dto.request.CategoryRequest;
import com.aicoresolution.backend.dto.response.CategoryResponse;
import com.aicoresolution.backend.entity.Category;
import com.aicoresolution.backend.repository.CategoryRepository;
import com.aicoresolution.backend.service.ICategoryService;
import com.aicoresolution.backend.common.headers.HeaderUtils;

import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class CategoryService implements ICategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating category: {} - RequestID: {}", request.getName(), requestId);
        if (categoryRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Category category = new Category();
        applyData(category, request);
        category.setCreatedAt(LocalDateTime.now());

        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating category {} - RequestID: {}", id, requestId);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (request.getSlug() != null && !category.getSlug().equalsIgnoreCase(request.getSlug())
                && categoryRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        applyData(category, request);
        category.setUpdatedAt(LocalDateTime.now());

        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting category {} - TraceID: {}", id, traceId);
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found");
        }

        if (categoryRepository.existsByParentId(id)) {
            throw new IllegalArgumentException(
                    "Cannot delete category with subcategories. Please delete all subcategories first.");
        }

        categoryRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<CategoryResponse> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "sortOrder"));
        return categoryRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getById(Long id) {
        logger.debug("Getting category {}", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        return toResponse(category);
    }

    @Transactional(readOnly = true)
    public CategoryResponse getBySlug(String slug) {
        Category category = categoryRepository.findBySlugIgnoreCase(slug)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
        return toResponse(category);
    }

    private void applyData(Category category, CategoryRequest request) {
        if (request.getName() != null) {
            category.setName(request.getName().trim());
        }
        if (request.getSlug() != null) {
            category.setSlug(request.getSlug().trim());
        }
        if (request.getDescription() != null) {
            category.setDescription(request.getDescription());
        }
        if (request.getThumbnailUrl() != null) {
            category.setThumbnailUrl(request.getThumbnailUrl());
        }
        if (request.getMetaTitle() != null) {
            category.setMetaTitle(request.getMetaTitle());
        }
        if (request.getMetaDescription() != null) {
            category.setMetaDescription(request.getMetaDescription());
        }
        if (request.getCanonicalUrl() != null) {
            category.setCanonicalUrl(request.getCanonicalUrl());
        }
        if (request.getOgImage() != null) {
            category.setOgImage(request.getOgImage());
        }
        if (request.getRobotsMeta() != null) {
            category.setRobotsMeta(request.getRobotsMeta());
        }
        if (request.getSortOrder() != null) {
            category.setSortOrder(request.getSortOrder());
        }
        if (request.getIsActive() != null) {
            category.setIsActive(request.getIsActive());
        }

        if (request.getParentId() != null) {
            Category parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new EntityNotFoundException("Parent category not found"));
            category.setParent(parent);
        }
    }

    private CategoryResponse toResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setSlug(category.getSlug());
        response.setDescription(category.getDescription());
        response.setThumbnailUrl(category.getThumbnailUrl());
        response.setParentId(category.getParent() != null ? category.getParent().getId() : null);
        response.setMetaTitle(category.getMetaTitle());
        response.setMetaDescription(category.getMetaDescription());
        response.setCanonicalUrl(category.getCanonicalUrl());
        response.setOgImage(category.getOgImage());
        response.setRobotsMeta(category.getRobotsMeta());
        response.setSortOrder(category.getSortOrder());
        response.setIsActive(category.getIsActive());
        response.setCreatedAt(category.getCreatedAt());
        response.setUpdatedAt(category.getUpdatedAt());
        return response;
    }
}
