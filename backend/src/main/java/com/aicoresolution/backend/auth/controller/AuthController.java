package com.aicoresolution.backend.auth.controller;

import com.aicoresolution.backend.auth.dto.LoginRequest;
import com.aicoresolution.backend.auth.dto.LoginResponse;
import com.aicoresolution.backend.auth.dto.RegisterRequest;
import com.aicoresolution.backend.auth.dto.TokenRequest;
import com.aicoresolution.backend.auth.dto.UserResponse;
import com.aicoresolution.backend.auth.service.IAuthService;
import com.aicoresolution.backend.common.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final IAuthService authService;

    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@Valid @RequestBody TokenRequest request) {
        return ResponseEntity.ok(authService.refresh(request.getRefreshToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@Valid @RequestBody TokenRequest request) {
        return ResponseEntity.ok(authService.logout(request.getRefreshToken()));
    }
}
