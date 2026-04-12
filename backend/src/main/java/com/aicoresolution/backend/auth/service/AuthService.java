package com.aicoresolution.backend.auth.service;

import com.aicoresolution.backend.auth.dto.LoginRequest;
import com.aicoresolution.backend.auth.dto.LoginResponse;
import com.aicoresolution.backend.security.JwtService;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.entity.UserRole;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@Service
public class AuthService implements CommandLineRunner {

    private final CmsUserRepository cmsUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(CmsUserRepository cmsUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
        this.cmsUserRepository = cmsUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {
        CmsUser user = cmsUserRepository.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = jwtService.generateAccessToken(user.getId(), user.getUsername(), user.getRole().name());
        return new LoginResponse(token, "Bearer", jwtService.getAccessTokenTtlSeconds());
    }

    @Override
    public void run(String... args) {
        if (cmsUserRepository.findByUsername("admin").isPresent()) {
            return;
        }

        CmsUser defaultAdmin = new CmsUser();
        defaultAdmin.setUsername("admin");
        defaultAdmin.setPasswordHash(passwordEncoder.encode("admin123"));
        defaultAdmin.setRole(UserRole.ADMIN);
        defaultAdmin.setCreatedAt(OffsetDateTime.now());
        cmsUserRepository.save(defaultAdmin);
    }
}
