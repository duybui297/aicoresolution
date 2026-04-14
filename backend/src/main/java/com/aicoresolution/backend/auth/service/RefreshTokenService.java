package com.aicoresolution.backend.auth.service;

import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RefreshTokenService {

    private final Set<String> revokedTokens = ConcurrentHashMap.newKeySet();

    public boolean isRevoked(String refreshToken) {
        return revokedTokens.contains(refreshToken);
    }

    public void revoke(String refreshToken) {
        revokedTokens.add(refreshToken);
    }
}
