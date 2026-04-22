package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.request.CategoryRequest;
import com.aicoresolution.backend.dto.response.CategoryResponse;
import com.aicoresolution.backend.service.ICategoryService;
import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    private static final Logger logger = LoggerFactory.getLogger(AdminCategoryController.class);
    private final ICategoryService categoryService;

    public AdminCategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<Page<CategoryResponse>> list(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        logger.debug("Listing categories - Page: {}, Size: {}", page, size);
        return ResponseEntity.ok(categoryService.list(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getById(@PathVariable Long id) {
        logger.debug("Getting category {}", id);
        return ResponseEntity.ok(categoryService.getById(id));
    }

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating category: {} - RequestID: {}", request.getName(), requestId);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating category {} - RequestID: {}", id, requestId);
        return ResponseEntity.ok(categoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting category {} - TraceID: {}", id, traceId);
        categoryService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Category deleted"));
    }
}
