package com.aicoresolution.backend.post.controller;

import com.aicoresolution.backend.post.dto.PostRevisionResponse;
import com.aicoresolution.backend.post.service.PostRevisionService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/posts/{postId}/revisions")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
public class AdminPostRevisionController {

    private final PostRevisionService revisionService;

    public AdminPostRevisionController(PostRevisionService revisionService) {
        this.revisionService = revisionService;
    }

    @GetMapping
    public ResponseEntity<Page<PostRevisionResponse>> list(@PathVariable Long postId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(revisionService.getRevisionsByPostId(postId, page, size));
    }

    @GetMapping("/{revisionId}")
    public ResponseEntity<PostRevisionResponse> getRevision(@PathVariable Long postId,
            @PathVariable Long revisionId) {
        return ResponseEntity.ok(revisionService.getRevisionById(revisionId));
    }
}
