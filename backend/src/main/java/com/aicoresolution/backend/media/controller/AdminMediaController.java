package com.aicoresolution.backend.media.controller;

import com.aicoresolution.backend.media.service.IMediaService;
import com.aicoresolution.backend.security.AuthenticatedUser;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import com.aicoresolution.backend.common.ApiResponse;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/media")
public class AdminMediaController {

    private final IMediaService mediaService;
    private final CmsUserRepository cmsUserRepository;

    public AdminMediaController(IMediaService mediaService, CmsUserRepository cmsUserRepository) {
        this.mediaService = mediaService;
        this.cmsUserRepository = cmsUserRepository;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "altText", required = false) String altText,
            @RequestParam(value = "caption", required = false) String caption,
            Authentication authentication) {

        // Get current user
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        CmsUser uploader = cmsUserRepository.findById(authenticatedUser.id())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Upload via service
        Object response = mediaService.upload(file, altText, caption, uploader);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse(true, "Upload successful", response));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> delete(@PathVariable Long id) {
        mediaService.delete(id);
        return ResponseEntity.ok(new ApiResponse(true, "Media deleted successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id) {
        Object media = mediaService.getById(id);
        return ResponseEntity.ok(new ApiResponse(true, "Media retrieved successfully", media));
    }
}
