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

import java.time.LocalDateTime;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final CmsUserRepository cmsUserRepository;

    public PostService(PostRepository postRepository, CmsUserRepository cmsUserRepository) {
        this.postRepository = postRepository;
        this.cmsUserRepository = cmsUserRepository;
    }

    @Transactional
    public PostResponse create(PostUpsertRequest request, Long creatorId) {
        if (postRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Post post = new Post();
        applyPostData(post, request);
        CmsUser creator = cmsUserRepository.findById(creatorId)
                .orElseThrow(() -> new EntityNotFoundException("Creator user not found"));
        post.setCreatedBy(creator);
        post.setUpdatedBy(creator);
        post.setAuthor(creator);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        return toResponse(postRepository.save(post));
    }

    @Transactional
    public PostResponse update(Long id, PostUpsertRequest request, Long updaterId) {
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
        post.setUpdatedAt(LocalDateTime.now());
        return toResponse(postRepository.save(post));
    }

    @Transactional
    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        post.setDeletedAt(LocalDateTime.now());
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> listAdmin(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"));
        return postRepository.findAllNotDeleted(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public PostResponse getAdminById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return toResponse(post);
    }

    @Transactional(readOnly = true)
    public Page<PostResponse> listPublished(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return postRepository.findPublishedNotDeleted(PostStatus.PUBLISHED, pageable).map(this::toResponse);
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
        post.setExcerpt(request.getExcerpt() == null ? null : request.getExcerpt().trim());
        post.setContent(request.getContent().trim());
        post.setThumbnailUrl(request.getThumbnailUrl() == null ? null : request.getThumbnailUrl().trim());
        post.setStatus(request.getStatus());
        // Bổ sung các trường mới nếu cần
        post.setMetaTitle(request.getMetaTitle());
        post.setMetaDescription(request.getMetaDescription());
        post.setMetaKeywords(request.getMetaKeywords());
        post.setCanonicalUrl(request.getCanonicalUrl());
        post.setRobotsMeta(request.getRobotsMeta());
        post.setOgTitle(request.getOgTitle());
        post.setOgDescription(request.getOgDescription());
        post.setOgImage(request.getOgImage());
        post.setOgType(request.getOgType());
        post.setTwitterCard(request.getTwitterCard());
        post.setTwitterTitle(request.getTwitterTitle());
        post.setTwitterDescription(request.getTwitterDescription());
        post.setTwitterImage(request.getTwitterImage());
        post.setSchemaType(request.getSchemaType());
        post.setSchemaJson(request.getSchemaJson());
        post.setLocale(request.getLocale());
        post.setReadingTime(request.getReadingTime());
        post.setWordCount(request.getWordCount());
        post.setViewCount(request.getViewCount());
        post.setCommentCount(request.getCommentCount());
        post.setFeatured(request.getFeatured());
        post.setAllowComments(request.getAllowComments());

        if (request.getStatus() == PostStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
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
        response.setContentFormat(post.getContentFormat());
        response.setThumbnailUrl(post.getThumbnailUrl());
        response.setThumbnailAlt(post.getThumbnailAlt());
        response.setStatus(post.getStatus());
        response.setPublishedAt(post.getPublishedAt());
        response.setScheduledAt(post.getScheduledAt());
        response.setMetaTitle(post.getMetaTitle());
        response.setMetaDescription(post.getMetaDescription());
        response.setMetaKeywords(post.getMetaKeywords());
        response.setCanonicalUrl(post.getCanonicalUrl());
        response.setRobotsMeta(post.getRobotsMeta());
        response.setOgTitle(post.getOgTitle());
        response.setOgDescription(post.getOgDescription());
        response.setOgImage(post.getOgImage());
        response.setOgType(post.getOgType());
        response.setTwitterCard(post.getTwitterCard());
        response.setTwitterTitle(post.getTwitterTitle());
        response.setTwitterDescription(post.getTwitterDescription());
        response.setTwitterImage(post.getTwitterImage());
        response.setSchemaType(post.getSchemaType());
        response.setSchemaJson(post.getSchemaJson());
        response.setLocale(post.getLocale());
        response.setReadingTime(post.getReadingTime());
        response.setWordCount(post.getWordCount());
        response.setViewCount(post.getViewCount());
        response.setCommentCount(post.getCommentCount());
        response.setFeatured(post.getFeatured());
        response.setAllowComments(post.getAllowComments());
        response.setAuthorId(post.getAuthor().getId());
        response.setCreatedById(post.getCreatedBy() != null ? post.getCreatedBy().getId() : null);
        response.setUpdatedById(post.getUpdatedBy() != null ? post.getUpdatedBy().getId() : null);
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());
        response.setDeletedAt(post.getDeletedAt());
        return response;
    }
}
