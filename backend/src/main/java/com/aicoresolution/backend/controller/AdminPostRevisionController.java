package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.response.PostRevisionResponse;
import com.aicoresolution.backend.service.IPostRevisionService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/posts/{postId}/revisions")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
public class AdminPostRevisionController {

    private final IPostRevisionService revisionService;

    public AdminPostRevisionController(IPostRevisionService revisionService) {
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
