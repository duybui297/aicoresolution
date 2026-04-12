package com.aicoresolution.backend.auth.dto;

public class LoginResponse {

    private String accessToken;
    private String tokenType;
    private Long expiresInSeconds;

    public LoginResponse(String accessToken, String tokenType, Long expiresInSeconds) {
        this.accessToken = accessToken;
        this.tokenType = tokenType;
        this.expiresInSeconds = expiresInSeconds;
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
}
