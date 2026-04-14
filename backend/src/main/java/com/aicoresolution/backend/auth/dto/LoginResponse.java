package com.aicoresolution.backend.auth.dto;

public class LoginResponse {

    private String accessToken;
    private String tokenType;
    private Long expiresInSeconds;
    private String refreshToken;
    private Long userId;
    private String role;

    public LoginResponse(String accessToken, String tokenType, Long expiresInSeconds, String refreshToken,
            Long userId, String role) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresInSeconds = expiresInSeconds;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.role = role;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getExpiresInSeconds() {
        return expiresInSeconds;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public Long getUserId() {
        return userId;
    }

    public String getRole() {
        return role;
    }
}
