package com.aicoresolution.backend.service.impl;

import org.springframework.stereotype.Service;

import com.aicoresolution.backend.service.IRefreshTokenService;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RefreshTokenService implements IRefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);
    private final Map<String, LocalDateTime> revokedTokens = new HashMap<>();
    private static final long TOKEN_RETENTION_MINUTES = 60;

    @Override
    public void revoke(String refreshToken) {
        String requestId = HeaderUtils.getRequestId();
        logger.info("Revoking refresh token - RequestID: {}", requestId);
        if (refreshToken != null && !refreshToken.isBlank()) {
            revokedTokens.put(refreshToken, LocalDateTime.now());
        }
    }

    @Override
    public boolean isRevoked(String refreshToken) {
        String traceId = HeaderUtils.getTraceId();
        logger.debug("Checking if token is revoked - TraceID: {}", traceId);
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
