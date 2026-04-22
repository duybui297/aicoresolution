package com.aicoresolution.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileUploadService {

    /**
     * Validate uploaded file
     */
    void validateFile(MultipartFile file);

    /**
     * Save file to disk with UUID filename
     */
    String saveFile(MultipartFile file);

    /**
     * Delete file from disk
     */
    void deleteFile(String fileUrl);
}
