package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.dto.request.PostTranslationRequest;
import com.aicoresolution.backend.dto.response.PostTranslationResponse;
import com.aicoresolution.backend.entity.PostTranslation;
import com.aicoresolution.backend.repository.PostRepository;
import com.aicoresolution.backend.repository.PostTranslationRepository;
import com.aicoresolution.backend.service.IPostTranslationService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PostTranslationService implements IPostTranslationService {

    private final PostTranslationRepository translationRepository;
    private final PostRepository postRepository;

    public PostTranslationService(PostTranslationRepository translationRepository,
                                  PostRepository postRepository) {
        this.translationRepository = translationRepository;
        this.postRepository = postRepository;
    }

    @Override
    @Transactional
    public PostTranslationResponse create(PostTranslationRequest request) {
        postRepository.findById(request.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        if (translationRepository.existsBySlugIgnoreCase(request.getSlug())) {
            throw new IllegalArgumentException("Slug already exists");
        }

        PostTranslation translation = PostTranslation.builder()
                .postId(request.getPostId())
                .locale(request.getLocale().trim())
                .title(request.getTitle().trim())
                .slug(request.getSlug().trim())
                .excerpt(request.getExcerpt() != null ? request.getExcerpt().trim() : null)
                .content(request.getContent().trim())
                .metaTitle(request.getMetaTitle())
                .metaDescription(request.getMetaDescription())
                .ogTitle(request.getOgTitle())
                .ogDescription(request.getOgDescription())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return toResponse(translationRepository.save(translation));
    }

    @Override
    @Transactional
    public PostTranslationResponse update(Long postId, String locale, PostTranslationRequest request) {
        PostTranslation translation = translationRepository.findByPostIdAndLocale(postId, locale)
                .orElseThrow(() -> new EntityNotFoundException("Translation not found"));

        if (request.getTitle() != null) {
            translation.setTitle(request.getTitle().trim());
        }
        if (request.getSlug() != null) {
            if (!translation.getSlug().equalsIgnoreCase(request.getSlug()) &&
                    translationRepository.existsBySlugIgnoreCase(request.getSlug())) {
                throw new IllegalArgumentException("Slug already exists");
            }
            translation.setSlug(request.getSlug().trim());
        }
        if (request.getExcerpt() != null) {
            translation.setExcerpt(request.getExcerpt().trim());
        }
        if (request.getContent() != null) {
            translation.setContent(request.getContent().trim());
        }
        if (request.getMetaTitle() != null) {
            translation.setMetaTitle(request.getMetaTitle());
        }
        if (request.getMetaDescription() != null) {
            translation.setMetaDescription(request.getMetaDescription());
        }
        if (request.getOgTitle() != null) {
            translation.setOgTitle(request.getOgTitle());
        }
        if (request.getOgDescription() != null) {
            translation.setOgDescription(request.getOgDescription());
        }
        translation.setUpdatedAt(LocalDateTime.now());

        return toResponse(translationRepository.save(translation));
    }

    @Override
    @Transactional
    public void delete(Long postId, String locale) {
        PostTranslation translation = translationRepository.findByPostIdAndLocale(postId, locale)
                .orElseThrow(() -> new EntityNotFoundException("Translation not found"));
        translationRepository.delete(translation);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PostTranslationResponse> listByPostId(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return translationRepository.findByPostId(postId, pageable).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public PostTranslationResponse getByPostAndLocale(Long postId, String locale) {
        PostTranslation translation = translationRepository.findByPostIdAndLocale(postId, locale)
                .orElseThrow(() -> new EntityNotFoundException("Translation not found"));
        return toResponse(translation);
    }

    private PostTranslationResponse toResponse(PostTranslation translation) {
        return PostTranslationResponse.builder()
                .id(translation.getId())
                .postId(translation.getPostId())
                .locale(translation.getLocale())
                .title(translation.getTitle())
                .slug(translation.getSlug())
                .excerpt(translation.getExcerpt())
                .content(translation.getContent())
                .metaTitle(translation.getMetaTitle())
                .metaDescription(translation.getMetaDescription())
                .ogTitle(translation.getOgTitle())
                .ogDescription(translation.getOgDescription())
                .createdAt(translation.getCreatedAt())
                .updatedAt(translation.getUpdatedAt())
                .build();
    }
}
