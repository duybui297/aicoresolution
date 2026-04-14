package com.aicoresolution.backend.auth.dto;

import jakarta.validation.constraints.NotBlank;

public class TokenRequest {

    @NotBlank
    private String refreshToken;

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
