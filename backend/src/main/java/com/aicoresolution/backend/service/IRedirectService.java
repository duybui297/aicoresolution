package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.request.RedirectRequest;
import com.aicoresolution.backend.dto.response.RedirectResponse;
import org.springframework.data.domain.Page;

public interface IRedirectService {
    RedirectResponse create(RedirectRequest request);
    RedirectResponse update(Long id, RedirectRequest request);
    void delete(Long id);
    Page<RedirectResponse> list(int page, int size);
    RedirectResponse getById(Long id);
    RedirectResponse getByFromPath(String fromPath);
    void incrementHitCount(String fromPath);
}
