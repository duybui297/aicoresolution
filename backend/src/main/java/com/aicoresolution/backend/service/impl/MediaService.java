package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.entity.Media;
import com.aicoresolution.backend.repository.MediaRepository;
import com.aicoresolution.backend.service.IFileUploadService;
import com.aicoresolution.backend.service.IMediaService;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import com.aicoresolution.backend.dto.response.MediaResponse;
import com.aicoresolution.backend.entity.CmsUser;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;

@Service
@Transactional
public class MediaService implements IMediaService {

    private static final Logger logger = LoggerFactory.getLogger(MediaService.class);
    private final MediaRepository mediaRepository;
    private final IFileUploadService fileUploadService;

    public MediaService(MediaRepository mediaRepository, IFileUploadService fileUploadService) {
        this.mediaRepository = mediaRepository;
        this.fileUploadService = fileUploadService;
    }

    @Override
    @Transactional
    public MediaResponse upload(MultipartFile file, String altText, String caption, Long uploadedById) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Uploading media file: {} - RequestID: {}", file.getOriginalFilename(), requestId);
        // Validate file
        fileUploadService.validateFile(file);

        // Save file to disk
        String fileUrl = fileUploadService.saveFile(file);

        // Create Media entity using Builder
        Media media = Media.builder()
                .fileUrl(fileUrl)
                .fileName(file.getOriginalFilename())
                .mimeType(file.getContentType())
                .fileSize(file.getSize())
                .altText(altText)
                .caption(caption)
                .uploadedById(uploadedById)
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(mediaRepository.save(media));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.info("Deleting media {} - TraceID: {}", id, traceId);
        Media media = mediaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Media not found"));

        // Delete from disk
        fileUploadService.deleteFile(media.getFileUrl());

        // Delete from DB
        mediaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public MediaResponse getById(Long id) {
        String traceId = HeaderUtils.getTraceId();
        logger.debug("Getting media {} - TraceID: {}", id, traceId);
        Media media = mediaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Media not found"));
        return toResponse(media);
    }

    private MediaResponse toResponse(Media media) {
        return MediaResponse.builder()
                .id(media.getId())
                .fileUrl(media.getFileUrl())
                .fileName(media.getFileName())
                .fileSize(media.getFileSize())
                .altText(media.getAltText())
                .caption(media.getCaption())
                .width(media.getWidth())
                .height(media.getHeight())
                .createdAt(media.getCreatedAt())
                .build();
    }
}
