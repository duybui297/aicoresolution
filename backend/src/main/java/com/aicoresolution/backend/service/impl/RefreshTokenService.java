package com.aicoresolution.backend.service.impl;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.aicoresolution.backend.service.IRefreshTokenService;
import com.aicoresolution.backend.common.headers.HeaderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Manages refresh token revocation for logout and reuse prevention.
 *
 * <h2>IMPORTANT — Production Scalability Warning</h2>
 * <p>
 * This implementation uses in-memory {@link ConcurrentHashMap} storage.
 * It works correctly for a <b>single-instance</b> deployment, but has the following
 * limitations in multi-instance (horizontal scaling) environments:
 * </p>
 * <ul>
 *   <li>Revoked tokens on one instance are <b>not</b> visible to other instances.
 *        A token revoked on instance A remains valid on instance B until that instance
 *        is restarted or its own TTL cleanup runs.</li>
 *   <li>Server restart clears the revocation list, making all previously-issued
 *        refresh tokens temporarily valid again.</li>
 *   <li>Scheduled cleanup ({@link #cleanupExpiredTokens()}) runs on every instance
 *        independently — no cross-instance coordination.</li>
 * </ul>
 * <p>
 * For multi-instance production deployments, replace this with a shared store:
 * Redis (recommended) or a database table. Update {@link IRefreshTokenService}
 * accordingly and wire it as a Spring {@code @Bean}.
 * </p>
 *
 * <h2>Token Lifecycle</h2>
 * <ul>
 *   <li><b>Revoked</b>: stored with revocation timestamp, kept for
 *        {@value #TOKEN_RETENTION_MINUTES} for efficient O(1) lookup.</li>
 *   <li><b>Expired</b>: removed from map by the hourly scheduled task.</li>
 *   <li><b>Active</b>: not stored — absent from map means not revoked.</li>
 * </ul>
 *
 * @see IRefreshTokenService
 */
@Service
public class RefreshTokenService implements IRefreshTokenService {

    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenService.class);
    private final Map<String, LocalDateTime> revokedTokens = new ConcurrentHashMap<>();
    private static final long TOKEN_RETENTION_MINUTES = 60;
    private static final long CLEANUP_INTERVAL_MINUTES = 30;

    @Override
    public void revoke(String refreshToken) {
        String requestId = HeaderUtils.getRequestId();
        if (refreshToken == null || refreshToken.isBlank()) {
            logger.debug("Revoke called with null/blank token - RequestID: {}", requestId);
            return;
        }
        revokedTokens.put(refreshToken, LocalDateTime.now());
        logger.info("Refresh token revoked - RequestID: {}", requestId);
    }

    @Override
    public boolean isRevoked(String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            return true;
        }
        return revokedTokens.containsKey(refreshToken);
    }

    @Scheduled(fixedRate = CLEANUP_INTERVAL_MINUTES * 60 * 1000)
    @Override
    public void cleanupExpiredTokens() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(TOKEN_RETENTION_MINUTES);

        Set<String> tokensToRemove = revokedTokens.entrySet().stream()
                .filter(entry -> entry.getValue().isBefore(cutoffTime))
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        if (!tokensToRemove.isEmpty()) {
            tokensToRemove.forEach(revokedTokens::remove);
            logger.info("Cleaned up {} expired revoked token(s)", tokensToRemove.size());
        }
    }
}
