package com.aicoresolution.backend.auth.service;

public interface IRefreshTokenService {

    /**
     * Revoke a refresh token
     */
    void revoke(String refreshToken);

    /**
     * Check if a refresh token is revoked
     */
    boolean isRevoked(String refreshToken);

    /**
     * Clean up expired tokens
     */
    void cleanupExpiredTokens();
}
