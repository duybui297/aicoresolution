package com.aicoresolution.backend.post.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.post.dto.PostResponse;
import com.aicoresolution.backend.post.dto.PostUpsertRequest;
import com.aicoresolution.backend.post.service.PostService;
import com.aicoresolution.backend.security.AuthenticatedUser;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/admin/posts")
public class AdminPostController {

    private final PostService postService;

    public AdminPostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ResponseEntity<Page<PostResponse>> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(postService.listAdmin(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(postService.getAdminById(id));
    }

    @PostMapping
    public ResponseEntity<PostResponse> create(@Valid @RequestBody PostUpsertRequest request,
            Authentication authentication) {
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.create(request, authenticatedUser.id()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostResponse> update(@PathVariable UUID id,
            @Valid @RequestBody PostUpsertRequest request,
            Authentication authentication) {
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        return ResponseEntity.ok(postService.update(id, request, authenticatedUser.id()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable UUID id) {
        postService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Post deleted"));
    }
}
