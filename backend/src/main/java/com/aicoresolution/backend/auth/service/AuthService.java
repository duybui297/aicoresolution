package com.aicoresolution.backend.auth.service;

import com.aicoresolution.backend.auth.dto.LoginRequest;
import com.aicoresolution.backend.auth.dto.LoginResponse;
import com.aicoresolution.backend.auth.dto.RegisterRequest;
import com.aicoresolution.backend.auth.dto.UserResponse;
import com.aicoresolution.backend.common.ApiResponse;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

@Service
public class AuthService implements IAuthService, CommandLineRunner {

    private final CmsUserRepository cmsUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final IRefreshTokenService refreshTokenService;
    private final String seedAdminUsername;
    private final String seedAdminPassword;

    public AuthService(CmsUserRepository cmsUserRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            IRefreshTokenService refreshTokenService,
            @Value("${APP_SEED_ADMIN_USERNAME}") String seedAdminUsername,
            @Value("${APP_SEED_ADMIN_PASSWORD}") String seedAdminPassword) {
        this.cmsUserRepository = cmsUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.seedAdminUsername = seedAdminUsername;
        this.seedAdminPassword = seedAdminPassword;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String username = request.getUsername().trim();
        String email = request.getEmail().trim();

        if (cmsUserRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (cmsUserRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }

        CmsUser user = new CmsUser();
        user.setUsername(username);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(username);
        user.setRole(UserRole.CONTRIBUTOR);
        user.setStatus(UserStatus.ACTIVE);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());

        return toUserResponse(cmsUserRepository.save(user));
    }

    public LoginResponse login(LoginRequest request) {
        String username = request.getUsername().trim();

        // Try to find user by username first, then by email
        CmsUser user = cmsUserRepository.findByUsername(username)
                .or(() -> cmsUserRepository.findByEmail(username))
                .orElseThrow(() -> new BadCredentialsException("Invalid username/email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid username/email or password");
        }

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadCredentialsException("User account is not active");
        }

        return buildLoginResponse(user);
    }

    public LoginResponse refresh(String refreshToken) {
        if (refreshTokenService.isRevoked(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        var claims = jwtService.parseToken(refreshToken);
        String tokenType = claims.get("typ", String.class);
        if (!"refresh".equals(tokenType)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        Long userId = Long.valueOf(claims.get("uid", String.class));
        CmsUser user = cmsUserRepository.findById(userId)
                .orElseThrow(() -> new BadCredentialsException("Invalid refresh token"));

        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new BadCredentialsException("User account is not active");
        }

        refreshTokenService.revoke(refreshToken);
        return buildLoginResponse(user);
    }

    public ApiResponse logout(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token is required");
        }

        if (refreshTokenService.isRevoked(refreshToken)) {
            return new ApiResponse(true, "Logged out");
        }

        refreshTokenService.revoke(refreshToken);
        return new ApiResponse(true, "Logged out");
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

    private LoginResponse buildLoginResponse(CmsUser user) {
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getUsername(), user.getRole().name());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getUsername(), user.getRole().name());
        return new LoginResponse(accessToken, "Bearer", jwtService.getAccessTokenTtlSeconds(), refreshToken,
                user.getId(), user.getRole().name());
    }

    private UserResponse toUserResponse(CmsUser user) {
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
