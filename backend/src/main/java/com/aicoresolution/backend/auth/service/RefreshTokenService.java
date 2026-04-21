package com.aicoresolution.backend.auth.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RefreshTokenService implements IRefreshTokenService {

    private final Map<String, LocalDateTime> revokedTokens = new HashMap<>();
    private static final long TOKEN_RETENTION_MINUTES = 60;

    @Override
    public void revoke(String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            revokedTokens.put(refreshToken, LocalDateTime.now());
        }
    }

    @Override
    public boolean isRevoked(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return true;
        }

        cleanupExpiredTokens();
        return revokedTokens.containsKey(refreshToken);
    }

    @Override
    public void cleanupExpiredTokens() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(TOKEN_RETENTION_MINUTES);

        Set<String> tokensToRemove = revokedTokens.entrySet().stream()
                .filter(entry -> entry.getValue().isBefore(cutoffTime))
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        tokensToRemove.forEach(revokedTokens::remove);
    }
}
