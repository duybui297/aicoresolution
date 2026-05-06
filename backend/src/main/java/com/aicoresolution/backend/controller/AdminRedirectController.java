package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.request.RedirectRequest;
import com.aicoresolution.backend.dto.response.RedirectResponse;
import com.aicoresolution.backend.service.IRedirectService;
import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/redirects")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR')")
public class AdminRedirectController {

    private static final Logger logger = LoggerFactory.getLogger(AdminRedirectController.class);
    private final IRedirectService redirectService;

    @GetMapping
    public ResponseEntity<Page<RedirectResponse>> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(redirectService.list(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RedirectResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(redirectService.getById(id));
    }

    @PostMapping
    public ResponseEntity<RedirectResponse> create(@Valid @RequestBody RedirectRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Creating redirect: {} -> {} - RequestID: {}", request.getFromPath(), request.getToPath(), requestId);
        return ResponseEntity.status(HttpStatus.CREATED).body(redirectService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RedirectResponse> update(@PathVariable Long id, @Valid @RequestBody RedirectRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Updating redirect {}: {} -> {} - RequestID: {}", id, request.getFromPath(), request.getToPath(), requestId);
        return ResponseEntity.ok(redirectService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting redirect {} - TraceID: {}", id, traceId);
        redirectService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Redirect deleted successfully"));
    }
}
