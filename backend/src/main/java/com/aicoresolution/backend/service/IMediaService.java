package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.response.MediaResponse;
import com.aicoresolution.backend.entity.CmsUser;
import org.springframework.web.multipart.MultipartFile;

public interface IMediaService {

    /**
     * Upload media file
     */
    MediaResponse upload(MultipartFile file, String altText, String caption, CmsUser uploadedBy);

    /**
     * Delete media by id
     */
    void delete(Long id);

    /**
     * Get media by id
     */
    MediaResponse getById(Long id);
}
