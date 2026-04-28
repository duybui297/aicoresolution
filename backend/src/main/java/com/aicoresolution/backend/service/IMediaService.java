package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.response.MediaResponse;
import org.springframework.web.multipart.MultipartFile;

public interface IMediaService {

    /**
     * Upload media file
     */
    MediaResponse upload(MultipartFile file, String altText, String caption, Long uploadedById);

    /**
     * Delete media by id
     */
    void delete(Long id);

    /**
     * Get media by id
     */
    MediaResponse getById(Long id);
}
