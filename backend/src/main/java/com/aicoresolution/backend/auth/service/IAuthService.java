package com.aicoresolution.backend.auth.service;

import com.aicoresolution.backend.auth.dto.LoginRequest;
import com.aicoresolution.backend.auth.dto.LoginResponse;
import com.aicoresolution.backend.auth.dto.RegisterRequest;
import com.aicoresolution.backend.auth.dto.UserResponse;
import com.aicoresolution.backend.common.ApiResponse;

public interface IAuthService {

    /**
     * Register new user
     */
    UserResponse register(RegisterRequest request);

    /**
     * Login user
     */
    LoginResponse login(LoginRequest request);

    /**
     * Refresh access token
     */
    LoginResponse refresh(String refreshToken);

    /**
     * Logout user by revoking refresh token
     */
    ApiResponse logout(String refreshToken);
}
