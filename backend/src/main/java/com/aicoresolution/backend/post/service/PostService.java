package com.aicoresolution.backend.post.service;

import com.aicoresolution.backend.post.dto.PostResponse;
import com.aicoresolution.backend.post.dto.PostUpsertRequest;
import com.aicoresolution.backend.post.entity.Post;
import com.aicoresolution.backend.post.entity.PostStatus;
import com.aicoresolution.backend.post.repository.PostRepository;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CmsUserRepository cmsUserRepository;

    public PostService(PostRepository postRepository, CmsUserRepository cmsUserRepository) {
        this.postRepository = postRepository;
        this.cmsUserRepository = cmsUserRepository;
    }

    @Transactional
    public PostResponse create(PostUpsertRequest request, UUID creatorId) {
        if (postRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Post post = new Post();
        applyPostData(post, request);
        CmsUser creator = cmsUserRepository.findById(creatorId)
                .orElseThrow(() -> new EntityNotFoundException("Creator user not found"));
        post.setCreatedBy(creator);
        post.setUpdatedBy(creator);
        post.setCreatedAt(OffsetDateTime.now());
        post.setUpdatedAt(OffsetDateTime.now());

        return toResponse(postRepository.save(post));
    }

    @Transactional
    public PostResponse update(UUID id, PostUpsertRequest request, UUID updaterId) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        CmsUser updater = cmsUserRepository.findById(updaterId)
                .orElseThrow(() -> new EntityNotFoundException("Updater user not found"));

        if (!post.getSlug().equalsIgnoreCase(request.getSlug())
                && postRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        applyPostData(post, request);
        post.setUpdatedBy(updater);
        post.setUpdatedAt(OffsetDateTime.now());
        return toResponse(postRepository.save(post));
    }

    @Transactional
    public void delete(UUID id) {
        if (!postRepository.existsById(id)) {
            throw new EntityNotFoundException("Post not found");
        }
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> listAdmin(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        return postRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public PostResponse getAdminById(UUID id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return toResponse(post);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> listPublished(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findByStatusOrderByPublishedAtDesc(PostStatus.PUBLISHED, pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public PostResponse getPublishedBySlug(String slug) {
        Post post = postRepository.findBySlugIgnoreCaseAndStatus(slug, PostStatus.PUBLISHED)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return toResponse(post);
    }

    private void applyPostData(Post post, PostUpsertRequest request) {
        post.setTitle(request.getTitle().trim());
        post.setSlug(request.getSlug().trim());
        post.setExcerpt(request.getExcerpt().trim());
        post.setContent(request.getContent().trim());
        post.setThumbnailUrl(request.getThumbnailUrl() == null ? null : request.getThumbnailUrl().trim());
        post.setStatus(request.getStatus());

        if (request.getStatus() == PostStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(OffsetDateTime.now());
        }

        if (request.getStatus() == PostStatus.DRAFT) {
            post.setPublishedAt(null);
        }
    }

    private PostResponse toResponse(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setSlug(post.getSlug());
        response.setExcerpt(post.getExcerpt());
        response.setContent(post.getContent());
        response.setThumbnailUrl(post.getThumbnailUrl());
        response.setStatus(post.getStatus());
        response.setPublishedAt(post.getPublishedAt());
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());
        response.setCreatedById(post.getCreatedBy().getId());
        response.setUpdatedById(post.getUpdatedBy() == null ? null : post.getUpdatedBy().getId());
        return response;
    }
}
