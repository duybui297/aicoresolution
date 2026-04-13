package com.aicoresolution.backend.category.service;

import com.aicoresolution.backend.category.dto.CategoryRequest;
import com.aicoresolution.backend.category.dto.CategoryResponse;
import com.aicoresolution.backend.category.entity.Category;
import com.aicoresolution.backend.category.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
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
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (!category.getSlug().equalsIgnoreCase(request.getSlug())
                && categoryRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        applyData(category, request);
        category.setUpdatedAt(LocalDateTime.now());

        return toResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Category not found");
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
        category.setName(request.getName().trim());
        category.setSlug(request.getSlug().trim());
        category.setDescription(request.getDescription());
        category.setThumbnailUrl(request.getThumbnailUrl());
        category.setMetaTitle(request.getMetaTitle());
        category.setMetaDescription(request.getMetaDescription());
        category.setCanonicalUrl(request.getCanonicalUrl());
        category.setOgImage(request.getOgImage());
        category.setRobotsMeta(request.getRobotsMeta());
        category.setSortOrder(request.getSortOrder());
        category.setIsActive(request.getIsActive());

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
