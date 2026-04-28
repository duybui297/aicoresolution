package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.security.AuthenticatedUser;
import com.aicoresolution.backend.service.IMediaService;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import com.aicoresolution.backend.common.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/media")
@PreAuthorize("hasAnyRole('ADMIN', 'EDITOR', 'AUTHOR')")
public class AdminMediaController {

    private static final Logger logger = LoggerFactory.getLogger(AdminMediaController.class);
    private final IMediaService mediaService;

    public AdminMediaController(IMediaService mediaService) {
        this.mediaService = mediaService;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "altText", required = false) String altText,
            @RequestParam(value = "caption", required = false) String caption,
            Authentication authentication) {

        String requestId = HeaderUtils.getRequestId();
        logger.info("Uploading media file: {} - RequestID: {}", file.getOriginalFilename(), requestId);

        // Get current user ID
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();

        // Upload via service
        Object response = mediaService.upload(file, altText, caption, authenticatedUser.id());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Upload successful", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting media {} - TraceID: {}", id, traceId);
        mediaService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Media deleted successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        logger.debug("Getting media {}", id);
        Object media = mediaService.getById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Media retrieved successfully", media));
    }
}
