package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import com.aicoresolution.backend.dto.request.BatchDeleteRequest;
import com.aicoresolution.backend.dto.request.PostUpsertRequest;
import com.aicoresolution.backend.dto.response.PostResponse;
import com.aicoresolution.backend.security.AuthenticatedUser;
import com.aicoresolution.backend.service.IPostService;

import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/v1/admin/posts")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR', 'CONTRIBUTOR')")
public class AdminPostController {

    private static final Logger logger = LoggerFactory.getLogger(AdminPostController.class);
    private final IPostService postService;

    public AdminPostController(IPostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String status) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Listing posts - Page: {}, Size: {}, Status: {}, RequestID: {}", page, size, status, requestId);
        return ResponseEntity.ok(postService.listAdmin(page, size, status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getById(@PathVariable Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.debug("Getting post {} - TraceID: {}", id, traceId);
        return ResponseEntity.ok(postService.getAdminById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
    @PostMapping
    public ResponseEntity<PostResponse> create(@Valid @RequestBody PostUpsertRequest request,
            Authentication authentication) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating post: {} - RequestID: {}", request.getTitle(), requestId);
        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (request.getSlug() == null || request.getSlug().isBlank()) {
            throw new IllegalArgumentException("Slug is required");
        }
        if (request.getContent() == null || request.getContent().isBlank()) {
            throw new IllegalArgumentException("Content is required");
        }
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.create(request, authenticatedUser.id()));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> update(@PathVariable Long id,
            @Valid @RequestBody PostUpsertRequest request,
            Authentication authentication) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating post {} - RequestID: {}", id, requestId);
        if (request.getTitle() == null || request.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (request.getSlug() == null || request.getSlug().isBlank()) {
            throw new IllegalArgumentException("Slug is required");
        }
        if (request.getContent() == null || request.getContent().isBlank()) {
            throw new IllegalArgumentException("Content is required");
        }
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok(postService.update(id, request, authenticatedUser.id()));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
    @PatchMapping("/{id}")
    public ResponseEntity<PostResponse> patch(@PathVariable Long id,
            @RequestBody PostUpsertRequest request,
            Authentication authentication) {
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok(postService.update(id, request, authenticatedUser.id()));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Deleting post {} - RequestID: {}", id, requestId);
        postService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Post deleted"));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
    @DeleteMapping("/batch-delete")
    public ResponseEntity<ApiResponse> batchDelete(@Valid @RequestBody BatchDeleteRequest request) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Batch deleting {} posts - TraceID: {}", request.getIds().size(), traceId);
        postService.deleteMultiple(request.getIds());
        return ResponseEntity.ok(new ApiResponse(true, "Deleted " + request.getIds().size() + " posts"));
    }
}
