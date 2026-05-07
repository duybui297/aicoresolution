package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.dto.request.PostUpsertRequest;
import com.aicoresolution.backend.dto.response.PostResponse;
import com.aicoresolution.backend.dto.response.PostMediaResponse;
import com.aicoresolution.backend.entity.*;
import com.aicoresolution.backend.repository.*;
import com.aicoresolution.backend.service.IPostService;
import com.aicoresolution.backend.service.IPostRevisionService;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PostService implements IPostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);
    private final PostRepository postRepository;
    private final CmsUserRepository cmsUserRepository;
    private final IPostRevisionService revisionService;
    private final PostCategoryRepository postCategoryRepository;
    private final PostTagRepository postTagRepository;
    private final PostMediaRepository postMediaRepository;
    private final PostAuthorRepository postAuthorRepository;
    private final RedirectRepository redirectRepository;

    public PostService(PostRepository postRepository,
                       CmsUserRepository cmsUserRepository,
                       IPostRevisionService revisionService,
                       PostCategoryRepository postCategoryRepository,
                       PostTagRepository postTagRepository,
                       PostMediaRepository postMediaRepository,
                       PostAuthorRepository postAuthorRepository,
                       RedirectRepository redirectRepository) {
        this.postRepository = postRepository;
        this.cmsUserRepository = cmsUserRepository;
        this.revisionService = revisionService;
        this.postCategoryRepository = postCategoryRepository;
        this.postTagRepository = postTagRepository;
        this.postMediaRepository = postMediaRepository;
        this.postAuthorRepository = postAuthorRepository;
        this.redirectRepository = redirectRepository;
    }

    @Override
    @Transactional
    public PostResponse create(PostUpsertRequest request, Long creatorId) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating post: {} - RequestID: {}", request.getTitle(), requestId);
        if (postRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        Post post = new Post();
        applyPostData(post, request);
        post.setCreatedById(creatorId);
        post.setUpdatedById(creatorId);
        post.setAuthorId(creatorId);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        Post savedPost = postRepository.save(post);
        savePostRelations(savedPost.getId(), request);

        return toResponse(savedPost);
    }

    @Override
    @Transactional
    public PostResponse update(Long id, PostUpsertRequest request, Long updaterId) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating post {} - RequestID: {}", id, requestId);
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        String oldSlug = post.getSlug();
        String newSlug = request.getSlug();
        
        if (newSlug != null && !newSlug.equalsIgnoreCase(oldSlug)
                && postRepository.existsBySlugIgnoreCase(newSlug)) {
            throw new IllegalArgumentException("Slug already exists");
        }

        applyPostData(post, request);
        post.setUpdatedById(updaterId);
        post.setUpdatedAt(LocalDateTime.now());
        Post updatedPost = postRepository.save(post);

        // Auto create redirect if slug changed
        if (newSlug != null && !newSlug.equalsIgnoreCase(oldSlug)) {
            String fromPath = "/posts/" + oldSlug;
            String toPath = "/posts/" + newSlug;
            
            if (redirectRepository.findByFromPath(fromPath).isEmpty()) {
                redirectRepository.save(Redirect.builder()
                        .fromPath(fromPath)
                        .toPath(toPath)
                        .statusCode((short) 301)
                        .isActive(true)
                        .note("Auto-created from post slug change: " + updatedPost.getTitle())
                        .createdAt(LocalDateTime.now())
                        .hitCount(0L)
                        .build());
                logger.info("Auto-created redirect from {} to {}", fromPath, toPath);
            }
        }

        // Update relations
        savePostRelations(id, request);

        // Create revision
        revisionService.createRevision(id, request.getChangeNote(), updaterId);

        return toResponse(updatedPost);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting post {} - TraceID: {}", id, traceId);
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        post.setDeletedAt(LocalDateTime.now());
        post.setStatus(PostStatus.DELETED);
        postRepository.save(post);
    }

    @Override
    @Transactional
    public void deleteMultiple(java.util.List<Long> ids) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting multiple posts: {} items - TraceID: {}", ids.size(), traceId);
        java.util.List<Post> posts = postRepository.findAllById(ids);
        LocalDateTime now = LocalDateTime.now();
        posts.forEach(post -> {
            post.setDeletedAt(now);
            post.setStatus(PostStatus.DELETED);
        });
        postRepository.saveAll(posts);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostResponse> listAdmin(Pageable pageable, 
            String search, java.util.List<String> statuses, 
            java.time.OffsetDateTime startDate, java.time.OffsetDateTime endDate,
            String role) {
        
        // Use default sort if none provided
        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), 
                    Sort.by(Sort.Direction.DESC, "updatedAt"));
        }
        
        org.springframework.data.jpa.domain.Specification<Post> spec = org.springframework.data.jpa.domain.Specification
                .where(com.aicoresolution.backend.service.specification.PostSpecification.isNotDeleted());

        if (search != null && !search.isBlank()) {
            spec = spec.and(com.aicoresolution.backend.service.specification.PostSpecification.hasSearchQuery(search));
        }

        if (statuses != null && !statuses.isEmpty() && !statuses.contains("All")) {
            List<PostStatus> postStatuses = new ArrayList<>();
            for (String s : statuses) {
                try {
                    postStatuses.add(PostStatus.valueOf(s.toUpperCase()));
                } catch (IllegalArgumentException e) {
                    logger.warn("Invalid status filter: {}", s);
                }
            }
            if (!postStatuses.isEmpty()) {
                spec = spec.and(com.aicoresolution.backend.service.specification.PostSpecification.hasStatusIn(postStatuses));
            }
        }

        if (startDate != null || endDate != null) {
            LocalDateTime start = startDate != null ? startDate.toLocalDateTime() : null;
            LocalDateTime end = endDate != null ? endDate.toLocalDateTime() : null;
            spec = spec.and(com.aicoresolution.backend.service.specification.PostSpecification.createdAtBetween(start, end));
        }

        if (role != null && !role.equalsIgnoreCase("All")) {
            try {
                UserRole userRole = UserRole.valueOf(role.toUpperCase().replace(" ", "_"));
                spec = spec.and(com.aicoresolution.backend.service.specification.PostSpecification.authorHasRole(userRole));
            } catch (IllegalArgumentException e) {
                logger.warn("Invalid role filter: {}", role);
            }
        }

        Page<Post> postPage = postRepository.findAll(spec, pageable);
        Page<PostResponse> responsePage = postPage.map(post -> toResponseInternal(post, true));
        enrichPostResponses(responsePage.getContent());
        return responsePage;
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponse getAdminById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));
        return toResponse(post);
    }

    @Override
    @Transactional(readOnly = true)
    public PostResponse getPublicBySlug(String slug) {
        Post post = postRepository.findBySlugIgnoreCaseAndStatus(slug, PostStatus.PUBLISHED)
                .orElseThrow(() -> new EntityNotFoundException("Post not found or not published"));
        
        if (post.getDeletedAt() != null) {
            throw new EntityNotFoundException("Post not found");
        }
        
        return toResponse(post);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostResponse> listPublic(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
        Page<PostResponse> responsePage = postRepository.findPublishedNotDeleted(PostStatus.PUBLISHED, pageable)
                .map(post -> toResponseInternal(post, true));
        enrichPostResponses(responsePage.getContent());
        return responsePage;
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
            String content = request.getContent().trim();
            post.setContent(content);
            
            String plainText = content.replaceAll("<[^>]*>", " ").replaceAll("\\s+", " ").trim();
            int wordCount = plainText.isEmpty() ? 0 : plainText.split("\\s+").length;
            post.setWordCount(wordCount);
            
            int readingTime = (int) Math.ceil(wordCount / 200.0);
            post.setReadingTime(readingTime);
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

        if (request.getReadingTime() != null && request.getReadingTime() > 0) {
            post.setReadingTime(request.getReadingTime());
        }
        if (request.getWordCount() != null && request.getWordCount() > 0) {
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

        // Cập nhật ngày đăng và ngày hẹn giờ từ request
        if (request.getPublishedAt() != null) {
            post.setPublishedAt(request.getPublishedAt());
        }
        if (request.getScheduledAt() != null) {
            post.setScheduledAt(request.getScheduledAt());
        }

        // Logic tự động nếu không gửi ngày cụ thể
        if (request.getStatus() == PostStatus.PUBLISHED && post.getPublishedAt() == null) {
            post.setPublishedAt(LocalDateTime.now());
        }

        if (request.getStatus() == PostStatus.DRAFT) {
            post.setPublishedAt(null);
            post.setScheduledAt(null);
        }
    }

    private void savePostRelations(Long postId, PostUpsertRequest request) {
        postCategoryRepository.deleteByPostId(postId);
        if (request.getCategoryIds() != null) {
            request.getCategoryIds().forEach(catId -> 
                postCategoryRepository.save(PostCategory.builder().postId(postId).categoryId(catId).build())
            );
        }

        postTagRepository.deleteByPostId(postId);
        if (request.getTagIds() != null) {
            request.getTagIds().forEach(tagId -> 
                postTagRepository.save(PostTag.builder().postId(postId).tagId(tagId).build())
            );
        }

        postMediaRepository.deleteByPostId(postId);
        if (request.getMedia() != null) {
            request.getMedia().forEach(m -> 
                postMediaRepository.save(PostMedia.builder()
                    .postId(postId)
                    .mediaId(m.getMediaId())
                    .sortOrder(m.getSortOrder())
                    .role(m.getRole())
                    .build())
            );
        }

        postAuthorRepository.deleteByPostId(postId);
        if (request.getAuthorIds() != null) {
            request.getAuthorIds().forEach(authId -> 
                postAuthorRepository.save(PostAuthor.builder().postId(postId).userId(authId).build())
            );
        }
    }

    private PostResponse toResponse(Post post) {
        return toResponseInternal(post, false);
    }

    private PostResponse toResponseInternal(Post post, boolean shallow) {
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
        response.setAuthorId(post.getAuthorId());
        
        response.setCreatedById(post.getCreatedById());
        response.setUpdatedById(post.getUpdatedById());
        response.setCreatedAt(post.getCreatedAt());
        response.setUpdatedAt(post.getUpdatedAt());
        response.setDeletedAt(post.getDeletedAt());

        if (!shallow) {
            if (post.getAuthorId() != null) {
                cmsUserRepository.findById(post.getAuthorId())
                    .ifPresent(user -> response.setAuthorName(user.getFullName()));
            }

            response.setCategoryIds(postCategoryRepository.findByPostId(post.getId()).stream()
                    .map(PostCategory::getCategoryId).toList());
            response.setTagIds(postTagRepository.findByPostId(post.getId()).stream()
                    .map(PostTag::getTagId).toList());
            response.setAuthorIds(postAuthorRepository.findByPostId(post.getId()).stream()
                    .map(PostAuthor::getUserId).toList());
            response.setMedia(postMediaRepository.findByPostId(post.getId()).stream()
                    .map(m -> PostMediaResponse.builder()
                            .mediaId(m.getMediaId())
                            .sortOrder(m.getSortOrder())
                            .role(m.getRole())
                            .build())
                    .toList());
        }

        return response;
    }

    private void enrichPostResponses(java.util.List<PostResponse> responses) {
        if (responses == null || responses.isEmpty()) return;
        
        List<Long> postIds = responses.stream().map(PostResponse::getId).toList();
        
        // Batch fetch all relations
        Map<Long, List<Long>> categoryMap = postCategoryRepository.findByPostIdIn(postIds).stream()
                .collect(Collectors.groupingBy(PostCategory::getPostId, 
                        Collectors.mapping(PostCategory::getCategoryId, Collectors.toList())));
        
        Map<Long, List<Long>> tagMap = postTagRepository.findByPostIdIn(postIds).stream()
                .collect(Collectors.groupingBy(PostTag::getPostId, 
                        Collectors.mapping(PostTag::getTagId, Collectors.toList())));
        
        Map<Long, List<Long>> authorIdsMap = postAuthorRepository.findByPostIdIn(postIds).stream()
                .collect(Collectors.groupingBy(PostAuthor::getPostId, 
                        Collectors.mapping(PostAuthor::getUserId, Collectors.toList())));
                        
        Map<Long, List<PostMediaResponse>> mediaMap = postMediaRepository.findByPostIdIn(postIds).stream()
                .collect(Collectors.groupingBy(PostMedia::getPostId,
                        Collectors.mapping(m -> PostMediaResponse.builder()
                                .mediaId(m.getMediaId())
                                .sortOrder(m.getSortOrder())
                                .role(m.getRole())
                                .build(), Collectors.toList())));
                                
        // Batch fetch all author names
        Set<Long> authorUserIds = responses.stream()
                .map(PostResponse::getAuthorId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
                
        Map<Long, String> authorNameMap = new HashMap<>();
        if (!authorUserIds.isEmpty()) {
            cmsUserRepository.findAllById(authorUserIds).forEach(user -> 
                authorNameMap.put(user.getId(), user.getFullName())
            );
        }
                
        // Fill data into responses
        responses.forEach(r -> {
            r.setCategoryIds(categoryMap.getOrDefault(r.getId(), Collections.emptyList()));
            r.setTagIds(tagMap.getOrDefault(r.getId(), Collections.emptyList()));
            r.setAuthorIds(authorIdsMap.getOrDefault(r.getId(), Collections.emptyList()));
            r.setMedia(mediaMap.getOrDefault(r.getId(), Collections.emptyList()));
            if (r.getAuthorId() != null) {
                r.setAuthorName(authorNameMap.get(r.getAuthorId()));
            }
        });
    }
}
