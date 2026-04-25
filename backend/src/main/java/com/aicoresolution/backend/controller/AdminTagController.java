package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.request.TagRequest;
import com.aicoresolution.backend.dto.response.TagResponse;
import com.aicoresolution.backend.service.ITagService;
import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/tags")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
public class AdminTagController {

    private static final Logger logger = LoggerFactory.getLogger(AdminTagController.class);
    private final ITagService tagService;

    public AdminTagController(ITagService tagService) {
        this.tagService = tagService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR', 'CONTRIBUTOR')")
    @GetMapping
    public ResponseEntity<Page<TagResponse>> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        logger.debug("Listing tags - Page: {}, Size: {}", page, size);
        return ResponseEntity.ok(tagService.list(page, size));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR', 'CONTRIBUTOR')")
    @GetMapping("/{id}")
    public ResponseEntity<TagResponse> getById(@PathVariable Long id) {
        logger.debug("Getting tag {}", id);
        return ResponseEntity.ok(tagService.getById(id));
    }

    @PostMapping
    public ResponseEntity<TagResponse> create(@Valid @RequestBody TagRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating tag: {} - RequestID: {}", request.getName(), requestId);
        return ResponseEntity.status(HttpStatus.CREATED).body(tagService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TagResponse> update(@PathVariable Long id, @Valid @RequestBody TagRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating tag {} - RequestID: {}", id, requestId);
        return ResponseEntity.ok(tagService.update(id, request));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TagResponse> patch(@PathVariable Long id, @RequestBody TagRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Patching tag {} - RequestID: {}", id, requestId);
        return ResponseEntity.ok(tagService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting tag {} - TraceID: {}", id, traceId);
        tagService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Tag deleted"));
    }
}
