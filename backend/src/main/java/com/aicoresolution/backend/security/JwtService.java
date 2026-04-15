package com.aicoresolution.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey secretKey;
    private final Duration accessTokenTtl;
    private final Duration refreshTokenTtl;

    public JwtService(@Value("${app.auth.jwt-secret}") String jwtSecret,
            @Value("${app.auth.access-token-minutes}") long accessTokenMinutes,
            @Value("${app.auth.refresh-token-minutes:10080}") long refreshTokenMinutes) {
        this.secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenTtl = Duration.ofMinutes(accessTokenMinutes);
        this.refreshTokenTtl = Duration.ofMinutes(refreshTokenMinutes);
    }

    public String generateAccessToken(Long userId, String username, String role) {
        return generateToken(userId, username, role, accessTokenTtl, "access");
    }

    public String generateRefreshToken(Long userId, String username, String role) {
        return generateToken(userId, username, role, refreshTokenTtl, "refresh");
    }

    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public long getAccessTokenTtlSeconds() {
        return accessTokenTtl.toSeconds();
    }

    public long getRefreshTokenTtlSeconds() {
        return refreshTokenTtl.toSeconds();
    }

    private String generateToken(Long userId, String username, String role, Duration ttl, String tokenType) {
        Instant now = Instant.now();
        Instant expiry = now.plus(ttl);

        return Jwts.builder()
                .subject(username)
                .claim("uid", userId.toString())
                .claim("role", role)
                .claim("typ", tokenType)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiry))
                .signWith(secretKey)
                .compact();
    }
}
