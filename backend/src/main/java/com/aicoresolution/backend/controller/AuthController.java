package com.aicoresolution.backend.controller;

import com.aicoresolution.backend.dto.request.LoginRequest;
import com.aicoresolution.backend.dto.request.RegisterRequest;
import com.aicoresolution.backend.dto.request.TokenRequest;
import com.aicoresolution.backend.dto.response.LoginResponse;
import com.aicoresolution.backend.dto.response.UserResponse;
import com.aicoresolution.backend.service.IAuthService;
import com.aicoresolution.backend.common.ApiResponse;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final IAuthService authService;

    public AuthController(IAuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Login attempt for user: {} - RequestID: {}", request.getUsername(), requestId);
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Register new user: {} - RequestID: {}", request.getUsername(), requestId);
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(@Valid @RequestBody TokenRequest request) {
        String traceId = HeaderUtils.getTraceId();
        logger.debug("Refreshing token - TraceID: {}", traceId);
        return ResponseEntity.ok(authService.refresh(request.getRefreshToken()));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@Valid @RequestBody TokenRequest request) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("User logout - RequestID: {}", requestId);
        return ResponseEntity.ok(authService.logout(request.getRefreshToken()));
    }
}
