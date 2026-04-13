package com.aicoresolution.backend.auth.service;

import com.aicoresolution.backend.auth.dto.LoginRequest;
import com.aicoresolution.backend.auth.dto.LoginResponse;
import com.aicoresolution.backend.security.JwtService;
import com.aicoresolution.backend.user.entity.CmsUser;
import com.aicoresolution.backend.user.entity.UserRole;
import com.aicoresolution.backend.user.entity.UserStatus;
import com.aicoresolution.backend.user.repository.CmsUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService implements CommandLineRunner {

    private final CmsUserRepository cmsUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final String seedAdminUsername;
    private final String seedAdminPassword;

    public AuthService(CmsUserRepository cmsUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            @Value("${APP_SEED_ADMIN_USERNAME}") String seedAdminUsername,
            @Value("${APP_SEED_ADMIN_PASSWORD}") String seedAdminPassword) {
        this.cmsUserRepository = cmsUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.seedAdminUsername = seedAdminUsername;
        this.seedAdminPassword = seedAdminPassword;
    }

    public LoginResponse login(LoginRequest request) {
        CmsUser user = cmsUserRepository.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadCredentialsException("User account is not active");
        }

        String token = jwtService.generateAccessToken(user.getId(), user.getUsername(), user.getRole().name());
        return new LoginResponse(token, "Bearer", jwtService.getAccessTokenTtlSeconds());
    }

    @Override
    public void run(String... args) {
        if (cmsUserRepository.findByUsername(seedAdminUsername).isPresent()) {
            return;
        }

        CmsUser defaultAdmin = new CmsUser();
        defaultAdmin.setUsername(seedAdminUsername);
        defaultAdmin.setEmail("admin@localhost");
        defaultAdmin.setPasswordHash(passwordEncoder.encode(seedAdminPassword));
        defaultAdmin.setFullName("Administrator");
        defaultAdmin.setRole(UserRole.ADMIN);
        defaultAdmin.setStatus(UserStatus.ACTIVE);
        defaultAdmin.setCreatedAt(LocalDateTime.now());
        defaultAdmin.setUpdatedAt(LocalDateTime.now());
        cmsUserRepository.save(defaultAdmin);
    }
}
