package com.aicoresolution.backend.post.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.post.service.PostTagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin/posts/{postId}/tags")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
public class AdminPostTagController {

    private final PostTagService postTagService;

    public AdminPostTagController(PostTagService postTagService) {
        this.postTagService = postTagService;
    }

    @GetMapping
    public ResponseEntity<Map<String, List<Long>>> list(@PathVariable Long postId) {
        List<Long> tagIds = postTagService.getTagIdsByPostId(postId);
        return ResponseEntity.ok(Map.of("tagIds", tagIds));
    }

    @PostMapping("/{tagId}")
    public ResponseEntity<ApiResponse> addTag(@PathVariable Long postId,
            @PathVariable Long tagId) {
        postTagService.addTag(postId, tagId);
        return ResponseEntity.ok(new ApiResponse(true, "Tag added"));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> setTags(@PathVariable Long postId,
            @RequestBody Map<String, List<Long>> request) {
        List<Long> tagIds = request.get("tagIds");
        postTagService.setTags(postId, tagIds);
        return ResponseEntity.ok(new ApiResponse(true, "Tags updated"));
    }

    @DeleteMapping("/{tagId}")
    public ResponseEntity<ApiResponse> removeTag(@PathVariable Long postId,
            @PathVariable Long tagId) {
        postTagService.removeTag(postId, tagId);
        return ResponseEntity.ok(new ApiResponse(true, "Tag removed"));
    }
}
