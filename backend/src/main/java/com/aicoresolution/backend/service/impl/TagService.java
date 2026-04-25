package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.dto.request.TagRequest;
import com.aicoresolution.backend.dto.response.TagResponse;
import com.aicoresolution.backend.entity.Tag;
import com.aicoresolution.backend.repository.TagRepository;
import com.aicoresolution.backend.service.ITagService;
import com.aicoresolution.backend.common.headers.HeaderUtils;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@Service
@Transactional
public class TagService implements ITagService {

    private static final Logger logger = LoggerFactory.getLogger(TagService.class);
    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Transactional
    public TagResponse create(TagRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating tag: {} - RequestID: {}", request.getName(), requestId);
        if (tagRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Tag tag = new Tag();
        applyData(tag, request);
        tag.setCreatedAt(LocalDateTime.now());

        return toResponse(tagRepository.save(tag));
    }

    @Transactional
    public TagResponse update(Long id, TagRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating tag {} - RequestID: {}", id, requestId);
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tag not found"));

        if (request.getSlug() != null && !tag.getSlug().equalsIgnoreCase(request.getSlug())
                && tagRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        applyData(tag, request);

        return toResponse(tagRepository.save(tag));
    }

    @Transactional
    public void delete(Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting tag {} - TraceID: {}", id, traceId);
        if (!tagRepository.existsById(id)) {
            throw new EntityNotFoundException("Tag not found");
        }
        tagRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<TagResponse> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return tagRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public TagResponse getById(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tag not found"));
        return toResponse(tag);
    }

    @Transactional(readOnly = true)
    public TagResponse getBySlug(String slug) {
        Tag tag = tagRepository.findBySlugIgnoreCase(slug)
                .orElseThrow(() -> new EntityNotFoundException("Tag not found"));
        return toResponse(tag);
    }

    private void applyData(Tag tag, TagRequest request) {
        if (request.getName() != null) {
            tag.setName(request.getName().trim());
        }
        if (request.getSlug() != null) {
            tag.setSlug(request.getSlug().trim());
        }
        if (request.getDescription() != null) {
            tag.setDescription(request.getDescription());
        }
        if (request.getMetaTitle() != null) {
            tag.setMetaTitle(request.getMetaTitle());
        }
        if (request.getMetaDescription() != null) {
            tag.setMetaDescription(request.getMetaDescription());
        }
    }

    private TagResponse toResponse(Tag tag) {
        TagResponse response = new TagResponse();
        response.setId(tag.getId());
        response.setName(tag.getName());
        response.setSlug(tag.getSlug());
        response.setDescription(tag.getDescription());
        response.setMetaTitle(tag.getMetaTitle());
        response.setMetaDescription(tag.getMetaDescription());
        response.setCreatedAt(tag.getCreatedAt());
        return response;
    }
}
