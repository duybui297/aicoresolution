package com.aicoresolution.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateProfileRequest {
    @NotBlank
    @Size(max = 150)
    private String fullName;

    @Size(max = 500)
    private String avatarUrl;

    private String bio;

    private Map<String, Object> socialLinks;

    @Size(min = 6, max = 100)
    private String currentPassword;

    @Size(min = 6, max = 100)
    private String newPassword;
}
