package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.request.PostTranslationRequest;
import com.aicoresolution.backend.dto.response.PostTranslationResponse;
import org.springframework.data.domain.Page;

public interface IPostTranslationService {
    PostTranslationResponse create(PostTranslationRequest request);
    PostTranslationResponse update(Long postId, String locale, PostTranslationRequest request);
    void delete(Long postId, String locale);
    Page<PostTranslationResponse> listByPostId(Long postId, int page, int size);
    PostTranslationResponse getByPostAndLocale(Long postId, String locale);
}
