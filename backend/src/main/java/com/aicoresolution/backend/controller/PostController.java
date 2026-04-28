package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.response.PostResponse;
import com.aicoresolution.backend.service.IPostService;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);
    private final IPostService postService;

    public PostController(IPostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Public listing posts - Page: {}, Size: {}, RequestID: {}", page, size, requestId);
        return ResponseEntity.ok(postService.listPublic(page, size));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<PostResponse> getBySlug(@PathVariable String slug) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Public getting post by slug: {} - TraceID: {}", slug, traceId);
        return ResponseEntity.ok(postService.getPublicBySlug(slug));
    }
}
