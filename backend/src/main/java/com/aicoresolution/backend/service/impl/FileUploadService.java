package com.aicoresolution.backend.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.aicoresolution.backend.service.IFileUploadService;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileUploadService implements IFileUploadService {

    private static final Logger logger = LoggerFactory.getLogger(FileUploadService.class);
    @Value("${app.media.upload-dir:D:/Works/uploads}")
    private String uploadDir;

    private static final String[] ALLOWED_TYPES = {
            "image/png", "image/jpeg", "image/webp", "image/gif"
    };

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    /**
     * Validate uploaded file
     */
    public void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (!isAllowedType(file.getContentType())) {
            throw new IllegalArgumentException("File type not allowed. Allowed types: PNG, JPEG, WebP, GIF");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File size exceeds 10MB");
        }
    }

    /**
     * Save file to disk with UUID filename
     */
    public String saveFile(MultipartFile file) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Saving file: {} - RequestID: {}", file.getOriginalFilename(), requestId);
        try {
            String filename = UUID.randomUUID() + getExtension(file.getOriginalFilename());
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            file.transferTo(filePath);

            return "/uploads/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    /**
     * Delete file from disk
     */
    public void deleteFile(String fileUrl) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting file: {} - TraceID: {}", fileUrl, traceId);
        try {
            Path filePath = Paths.get(uploadDir, fileUrl.replace("/uploads/", ""));
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            // Log error but don't throw - file might already be deleted
            System.err.println("Failed to delete file: " + e.getMessage());
        }
    }

    /**
     * Check if content type is allowed
     */
    private boolean isAllowedType(String contentType) {
        if (contentType == null)
            return false;
        for (String type : ALLOWED_TYPES) {
            if (type.equals(contentType)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Extract file extension
     */
    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return ".tmp";
        }
        return filename.substring(filename.lastIndexOf("."));
    }
}
