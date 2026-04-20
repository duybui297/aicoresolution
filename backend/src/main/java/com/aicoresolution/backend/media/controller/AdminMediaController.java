package com.aicoresolution.backend.media.controller;

import com.aicoresolution.backend.media.entity.Media;
import com.aicoresolution.backend.media.repository.MediaRepository;
import com.aicoresolution.backend.security.AuthenticatedUser;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/media")
public class AdminMediaController {

    private static final Set<String> ALLOWED_TYPES = Set.of("image/png", "image/jpeg", "image/webp", "image/gif");

    private final String uploadDir;
    private final MediaRepository mediaRepository;
    private final CmsUserRepository cmsUserRepository;

    public AdminMediaController(@Value("${app.media.upload-dir:uploads}") String uploadDir,
            MediaRepository mediaRepository,
            CmsUserRepository cmsUserRepository) {
        this.uploadDir = uploadDir;
        this.mediaRepository = mediaRepository;
        this.cmsUserRepository = cmsUserRepository;
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile file,
            @RequestParam(value = "alt_text", required = false) String altText,
            @RequestParam(value = "caption", required = false) String caption,
            Authentication authentication) {
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is required");
        }

        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only image files are allowed");
        }

        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + (extension == null ? "" : "." + extension.toLowerCase());
        String fileUrl = "/uploads/" + filename;

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Files.copy(file.getInputStream(), uploadPath.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store file");
        }

        // Create and save Media entity
        AuthenticatedUser authenticatedUser = (AuthenticatedUser) authentication.getPrincipal();
        CmsUser uploader = cmsUserRepository.findById(authenticatedUser.id())
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Media media = new Media();
        media.setFileName(file.getOriginalFilename());
        media.setFileUrl(fileUrl);
        media.setMimeType(file.getContentType());
        media.setFileSize(file.getSize());
        media.setAltText(altText);
        media.setCaption(caption);
        media.setUploadedBy(uploader);
        media.setCreatedAt(LocalDateTime.now());

        Media savedMedia = mediaRepository.save(media);

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedMedia.getId());
        response.put("url", fileUrl);
        response.put("fileName", savedMedia.getFileName());
        response.put("fileSize", savedMedia.getFileSize());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
