package com.aicoresolution.backend.service;

import com.aicoresolution.backend.dto.request.CreateUserRequest;
import com.aicoresolution.backend.dto.request.UpdateProfileRequest;
import com.aicoresolution.backend.dto.request.UpdateUserRequest;
import com.aicoresolution.backend.dto.response.UserResponse;
import org.springframework.data.domain.Page;

public interface IUserService {
    UserResponse createUser(CreateUserRequest request);
    UserResponse updateUser(Long id, UpdateUserRequest request);
    UserResponse updateProfile(Long userId, UpdateProfileRequest request);
    UserResponse getUserById(Long id);
    UserResponse getCurrentUserProfile(Long userId);
    Page<UserResponse> listUsers(int page, int size);
    void deleteUser(Long id);
}
