package com.aicoresolution.backend.post.controller;

import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.post.service.PostCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/admin/posts/{postId}/categories")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
public class AdminPostCategoryController {

    private final PostCategoryService postCategoryService;

    public AdminPostCategoryController(PostCategoryService postCategoryService) {
        this.postCategoryService = postCategoryService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> list(@PathVariable Long postId) {
        List<Long> categoryIds = postCategoryService.getCategoryIdsByPostId(postId);
        Long primaryCategoryId = postCategoryService.getPrimaryCategoryId(postId);
        return ResponseEntity.ok(Map.of(
                "categoryIds", categoryIds,
                "primaryCategoryId", primaryCategoryId));
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> addCategory(@PathVariable Long postId,
            @PathVariable Long categoryId,
            @RequestParam(required = false, defaultValue = "false") Boolean isPrimary) {
        postCategoryService.addCategory(postId, categoryId, isPrimary);
        return ResponseEntity.ok(new ApiResponse(true, "Category added"));
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<ApiResponse> removeCategory(@PathVariable Long postId,
            @PathVariable Long categoryId) {
        postCategoryService.removeCategory(postId, categoryId);
        return ResponseEntity.ok(new ApiResponse(true, "Category removed"));
    }
}
