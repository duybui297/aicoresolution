package com.aicoresolution.backend.tag.service;

import com.aicoresolution.backend.tag.dto.TagRequest;
import com.aicoresolution.backend.tag.dto.TagResponse;
import com.aicoresolution.backend.tag.entity.Tag;
import com.aicoresolution.backend.tag.repository.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Transactional
    public TagResponse create(TagRequest request) {
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
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tag not found"));

        if (!tag.getSlug().equalsIgnoreCase(request.getSlug())
                && tagRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        applyData(tag, request);

        return toResponse(tagRepository.save(tag));
    }

    @Transactional
    public void delete(Long id) {
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
        tag.setName(request.getName().trim());
        tag.setSlug(request.getSlug().trim());
        tag.setDescription(request.getDescription());
        tag.setMetaTitle(request.getMetaTitle());
        tag.setMetaDescription(request.getMetaDescription());
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
