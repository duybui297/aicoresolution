package com.aicoresolution.backend.auth.dto;

import com.aicoresolution.backend.user.entity.UserRole;
import com.aicoresolution.backend.user.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String avatarUrl;
    private String bio;
    private UserRole role;
    private UserStatus status;
    private LocalDateTime createdAt;
}
