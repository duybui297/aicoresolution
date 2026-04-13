package com.aicoresolution.backend.translation.service;

import com.aicoresolution.backend.post.repository.PostRepository;
import com.aicoresolution.backend.translation.dto.PostTranslationRequest;
import com.aicoresolution.backend.translation.dto.PostTranslationResponse;
import com.aicoresolution.backend.translation.entity.PostTranslation;
import com.aicoresolution.backend.translation.repository.PostTranslationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class PostTranslationService {

    private final PostTranslationRepository translationRepository;
    private final PostRepository postRepository;

    public PostTranslationService(PostTranslationRepository translationRepository,
            PostRepository postRepository) {
        this.translationRepository = translationRepository;
        this.postRepository = postRepository;
    }

    @Transactional
    public PostTranslationResponse create(PostTranslationRequest request) {
        postRepository.findById(request.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found"));

        PostTranslation translation = new PostTranslation();
        applyData(translation, request);
        translation.setCreatedAt(LocalDateTime.now());
        translation.setUpdatedAt(LocalDateTime.now());

        return toResponse(translationRepository.save(translation));
    }

    @Transactional
    public PostTranslationResponse update(Long postId, String locale, PostTranslationRequest request) {
        PostTranslation translation = translationRepository.findByPostIdAndLocale(postId, locale)
                .orElseThrow(() -> new EntityNotFoundException("Translation not found"));

        applyData(translation, request);
        translation.setUpdatedAt(LocalDateTime.now());

        return toResponse(translationRepository.save(translation));
    }

    @Transactional
    public void delete(Long postId, String locale) {
        PostTranslation translation = translationRepository.findByPostIdAndLocale(postId, locale)
                .orElseThrow(() -> new EntityNotFoundException("Translation not found"));
        translationRepository.delete(translation);
    }

    @Transactional(readOnly = true)
    public Page<PostTranslationResponse> listByPostId(Long postId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return translationRepository.findByPostId(postId, pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public PostTranslationResponse getByPostAndLocale(Long postId, String locale) {
        PostTranslation translation = translationRepository.findByPostIdAndLocale(postId, locale)
                .orElseThrow(() -> new EntityNotFoundException("Translation not found"));
        return toResponse(translation);
    }

    private void applyData(PostTranslation translation, PostTranslationRequest request) {
        translation.setPostId(request.getPostId());
        translation.setLocale(request.getLocale().trim());
        translation.setTitle(request.getTitle().trim());
        translation.setSlug(request.getSlug().trim());
        translation.setExcerpt(request.getExcerpt() == null ? null : request.getExcerpt().trim());
        translation.setContent(request.getContent().trim());
        translation.setMetaTitle(request.getMetaTitle());
        translation.setMetaDescription(request.getMetaDescription());
        translation.setOgTitle(request.getOgTitle());
        translation.setOgDescription(request.getOgDescription());
    }

    private PostTranslationResponse toResponse(PostTranslation translation) {
        PostTranslationResponse response = new PostTranslationResponse();
        response.setPostId(translation.getPostId());
        response.setLocale(translation.getLocale());
        response.setTitle(translation.getTitle());
        response.setSlug(translation.getSlug());
        response.setExcerpt(translation.getExcerpt());
        response.setContent(translation.getContent());
        response.setMetaTitle(translation.getMetaTitle());
        response.setMetaDescription(translation.getMetaDescription());
        response.setOgTitle(translation.getOgTitle());
        response.setOgDescription(translation.getOgDescription());
        return response;
    }
}
