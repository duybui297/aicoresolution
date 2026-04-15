package com.aicoresolution.backend.auth.service;

import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class RefreshTokenService {

    private final Set<String> revokedTokens = new HashSet<>();

    public void revoke(String refreshToken) {
        revokedTokens.add(refreshToken);
    }

    public boolean isRevoked(String refreshToken) {
        return revokedTokens.contains(refreshToken);
    }
}
