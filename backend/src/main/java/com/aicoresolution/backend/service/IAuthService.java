package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.request.LoginRequest;
import com.aicoresolution.backend.dto.request.RegisterRequest;
import com.aicoresolution.backend.dto.response.LoginResponse;
import com.aicoresolution.backend.dto.response.UserResponse;
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
