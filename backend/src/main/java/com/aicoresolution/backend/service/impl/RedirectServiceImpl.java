package com.aicoresolution.backend.service.impl;

import com.aicoresolution.backend.dto.request.RedirectRequest;
import com.aicoresolution.backend.dto.response.RedirectResponse;
import com.aicoresolution.backend.entity.Redirect;
import com.aicoresolution.backend.repository.RedirectRepository;
import com.aicoresolution.backend.service.IRedirectService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RedirectServiceImpl implements IRedirectService {

    private final RedirectRepository redirectRepository;

    @Override
    @Transactional
    public RedirectResponse create(RedirectRequest request) {
        if (redirectRepository.findByFromPath(request.getFromPath()).isPresent()) {
            throw new IllegalArgumentException("From path already exists");
        }

        Redirect redirect = Redirect.builder()
                .fromPath(request.getFromPath().trim())
                .toPath(request.getToPath().trim())
                .statusCode(request.getStatusCode() != null ? request.getStatusCode() : (short) 301)
                .note(request.getNote())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .hitCount(0L)
                .createdAt(LocalDateTime.now())
                .build();

        return toResponse(redirectRepository.save(redirect));
    }

    @Override
    @Transactional
    public RedirectResponse update(Long id, RedirectRequest request) {
        Redirect redirect = redirectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Redirect not found"));

        if (!redirect.getFromPath().equals(request.getFromPath())
                && redirectRepository.findByFromPath(request.getFromPath()).isPresent()) {
            throw new IllegalArgumentException("From path already exists");
        }

        redirect.setFromPath(request.getFromPath().trim());
        redirect.setToPath(request.getToPath().trim());
        redirect.setStatusCode(request.getStatusCode() != null ? request.getStatusCode() : (short) 301);
        redirect.setNote(request.getNote());
        redirect.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);

        return toResponse(redirectRepository.save(redirect));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!redirectRepository.existsById(id)) {
            throw new EntityNotFoundException("Redirect not found");
        }
        redirectRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RedirectResponse> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return redirectRepository.findAll(pageable).map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public RedirectResponse getById(Long id) {
        return redirectRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Redirect not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public RedirectResponse getByFromPath(String fromPath) {
        return redirectRepository.findByFromPath(fromPath)
                .map(this::toResponse)
                .orElseThrow(() -> new EntityNotFoundException("Redirect not found"));
    }

    @Override
    @Transactional
    public void incrementHitCount(String fromPath) {
        redirectRepository.findByFromPath(fromPath).ifPresent(redirect -> {
            redirect.setHitCount(redirect.getHitCount() + 1);
            redirectRepository.save(redirect);
        });
    }

    private RedirectResponse toResponse(Redirect redirect) {
        return RedirectResponse.builder()
                .id(redirect.getId())
                .fromPath(redirect.getFromPath())
                .toPath(redirect.getToPath())
                .statusCode(redirect.getStatusCode())
                .hitCount(redirect.getHitCount())
                .isActive(redirect.getIsActive())
                .note(redirect.getNote())
                .createdAt(redirect.getCreatedAt())
                .build();
    }
}
