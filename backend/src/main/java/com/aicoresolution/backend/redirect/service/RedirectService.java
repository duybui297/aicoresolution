package com.aicoresolution.backend.redirect.service;

import com.aicoresolution.backend.redirect.dto.RedirectRequest;
import com.aicoresolution.backend.redirect.dto.RedirectResponse;
import com.aicoresolution.backend.redirect.entity.Redirect;
import com.aicoresolution.backend.redirect.repository.RedirectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class RedirectService {

    private final RedirectRepository redirectRepository;

    public RedirectService(RedirectRepository redirectRepository) {
        this.redirectRepository = redirectRepository;
    }

    @Transactional
    public RedirectResponse create(RedirectRequest request) {
        if (redirectRepository.findByFromPath(request.getFromPath()).isPresent()) {
            throw new IllegalArgumentException("From path already exists");
        }

        Redirect redirect = new Redirect();
        applyData(redirect, request);
        redirect.setHitCount(0L);
        redirect.setCreatedAt(LocalDateTime.now());

        return toResponse(redirectRepository.save(redirect));
    }

    @Transactional
    public RedirectResponse update(Long id, RedirectRequest request) {
        Redirect redirect = redirectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Redirect not found"));

        if (!redirect.getFromPath().equals(request.getFromPath())
                && redirectRepository.findByFromPath(request.getFromPath()).isPresent()) {
            throw new IllegalArgumentException("From path already exists");
        }

        applyData(redirect, request);

        return toResponse(redirectRepository.save(redirect));
    }

    @Transactional
    public void delete(Long id) {
        if (!redirectRepository.existsById(id)) {
            throw new EntityNotFoundException("Redirect not found");
        }
        redirectRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<RedirectResponse> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return redirectRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public RedirectResponse getById(Long id) {
        Redirect redirect = redirectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Redirect not found"));
        return toResponse(redirect);
    }

    @Transactional(readOnly = true)
    public RedirectResponse getByFromPath(String fromPath) {
        Redirect redirect = redirectRepository.findByFromPath(fromPath)
                .orElseThrow(() -> new EntityNotFoundException("Redirect not found"));
        return toResponse(redirect);
    }

    @Transactional
    public void incrementHitCount(String fromPath) {
        redirectRepository.findByFromPath(fromPath).ifPresent(redirect -> {
            redirect.setHitCount(redirect.getHitCount() + 1);
            redirectRepository.save(redirect);
        });
    }

    private void applyData(Redirect redirect, RedirectRequest request) {
        redirect.setFromPath(request.getFromPath().trim());
        redirect.setToPath(request.getToPath().trim());
        redirect.setStatusCode(request.getStatusCode() != null ? request.getStatusCode() : (short) 301);
        redirect.setNote(request.getNote());
        redirect.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
    }

    private RedirectResponse toResponse(Redirect redirect) {
        RedirectResponse response = new RedirectResponse();
        response.setId(redirect.getId());
        response.setFromPath(redirect.getFromPath());
        response.setToPath(redirect.getToPath());
        response.setStatusCode(redirect.getStatusCode());
        response.setHitCount(redirect.getHitCount());
        response.setIsActive(redirect.getIsActive());
        response.setNote(redirect.getNote());
        response.setCreatedAt(redirect.getCreatedAt());
        return response;
    }
}
