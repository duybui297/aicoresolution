package com.aicoresolution.backend.user.service;

import com.aicoresolution.backend.user.dto.UserRequest;
import com.aicoresolution.backend.user.dto.UserResponse;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.entity.UserStatus;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final CmsUserRepository cmsUserRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(CmsUserRepository cmsUserRepository, PasswordEncoder passwordEncoder) {
        this.cmsUserRepository = cmsUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse create(UserRequest request) {
        if (cmsUserRepository.findByUsername(request.getUsername().trim()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (cmsUserRepository.findByEmail(request.getEmail().trim()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        CmsUser user = new CmsUser();
        applyData(user, request);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        return toResponse(cmsUserRepository.save(user));
    }

    @Transactional
    public UserResponse update(Long id, UserRequest request) {
        CmsUser user = cmsUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        if (!user.getUsername().equalsIgnoreCase(request.getUsername())
                && cmsUserRepository.findByUsername(request.getUsername().trim()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (!user.getEmail().equalsIgnoreCase(request.getEmail())
                && cmsUserRepository.findByEmail(request.getEmail().trim()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        applyData(user, request);
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        }

        return toResponse(cmsUserRepository.save(user));
    }

    @Transactional
    public void delete(Long id) {
        if (!cmsUserRepository.existsById(id)) {
            throw new EntityNotFoundException("User not found");
        }
        cmsUserRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<UserResponse> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return cmsUserRepository.findAll(pageable).map(this::toResponse);
    }

    @Transactional(readOnly = true)
    public UserResponse getById(Long id) {
        CmsUser user = cmsUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return toResponse(user);
    }

    @Transactional
    public UserResponse updateStatus(Long id, UserStatus status) {
        CmsUser user = cmsUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setStatus(status);
        return toResponse(cmsUserRepository.save(user));
    }

    @Transactional
    public UserResponse updateRole(Long id, String role) {
        CmsUser user = cmsUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setRole(Enum.valueOf(com.aicoresolution.backend.user.entity.UserRole.class, role));
        return toResponse(cmsUserRepository.save(user));
    }

    private void applyData(CmsUser user, UserRequest request) {
        user.setUsername(request.getUsername().trim());
        user.setEmail(request.getEmail().trim());
        user.setFullName(request.getFullName());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setBio(request.getBio());
        user.setRole(request.getRole());
        user.setStatus(request.getStatus());
    }

    private UserResponse toResponse(CmsUser user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setAvatarUrl(user.getAvatarUrl());
        response.setBio(user.getBio());
        response.setRole(user.getRole());
        response.setStatus(user.getStatus());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}
