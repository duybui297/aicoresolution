package com.aicoresolution.backend.dto.response;

import com.aicoresolution.backend.entity.UserRole;
import com.aicoresolution.backend.entity.UserStatus;
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
