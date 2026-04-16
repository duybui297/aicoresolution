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

    @Transactional
    public void deleteMultiple(java.util.List<Long> ids) {
        java.util.List<Post> posts = postRepository.findAllById(ids);
        LocalDateTime now = LocalDateTime.now();
        posts.forEach(post -> post.setDeletedAt(now));
        postRepository.saveAll(posts);
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

    private void applyPostData(Post post, PostUpsertRequest request) {
        if (request.getTitle() != null) {
            post.setTitle(request.getTitle().trim());
        }
        if (request.getSlug() != null) {
            post.setSlug(request.getSlug().trim());
        }
        if (request.getExcerpt() != null) {
            post.setExcerpt(request.getExcerpt().trim());
        }
        if (request.getContent() != null) {
            post.setContent(request.getContent().trim());
        }
        if (request.getContentFormat() != null) {
            post.setContentFormat(request.getContentFormat());
        }
        if (request.getThumbnailUrl() != null) {
            post.setThumbnailUrl(request.getThumbnailUrl().trim());
        }
        if (request.getThumbnailAlt() != null) {
            post.setThumbnailAlt(request.getThumbnailAlt());
        }
        if (request.getStatus() != null) {
            post.setStatus(request.getStatus());
        }
        if (request.getMetaTitle() != null) {
            post.setMetaTitle(request.getMetaTitle());
        }
        if (request.getMetaDescription() != null) {
            post.setMetaDescription(request.getMetaDescription());
        }
        if (request.getMetaKeywords() != null) {
            post.setMetaKeywords(request.getMetaKeywords());
        }
        if (request.getCanonicalUrl() != null) {
            post.setCanonicalUrl(request.getCanonicalUrl());
        }
        if (request.getRobotsMeta() != null) {
            post.setRobotsMeta(request.getRobotsMeta());
        }
        if (request.getOgTitle() != null) {
            post.setOgTitle(request.getOgTitle());
        }
        if (request.getOgDescription() != null) {
            post.setOgDescription(request.getOgDescription());
        }
        if (request.getOgImage() != null) {
            post.setOgImage(request.getOgImage());
        }
        if (request.getOgType() != null) {
            post.setOgType(request.getOgType());
        }
        if (request.getTwitterCard() != null) {
            post.setTwitterCard(request.getTwitterCard());
        }
        if (request.getTwitterTitle() != null) {
            post.setTwitterTitle(request.getTwitterTitle());
        }
        if (request.getTwitterDescription() != null) {
            post.setTwitterDescription(request.getTwitterDescription());
        }
        if (request.getTwitterImage() != null) {
            post.setTwitterImage(request.getTwitterImage());
        }
        if (request.getSchemaType() != null) {
            post.setSchemaType(request.getSchemaType());
        }
        if (request.getSchemaJson() != null) {
            post.setSchemaJson(request.getSchemaJson());
        }
        if (request.getLocale() != null) {
            post.setLocale(request.getLocale());
        }
        if (request.getReadingTime() != null) {
            post.setReadingTime(request.getReadingTime());
        }
        if (request.getWordCount() != null) {
            post.setWordCount(request.getWordCount());
        }
        if (request.getViewCount() != null) {
            post.setViewCount(request.getViewCount());
        }
        if (request.getCommentCount() != null) {
            post.setCommentCount(request.getCommentCount());
        }
        if (request.getFeatured() != null) {
            post.setFeatured(request.getFeatured());
        }
        if (request.getAllowComments() != null) {
            post.setAllowComments(request.getAllowComments());
        }

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
