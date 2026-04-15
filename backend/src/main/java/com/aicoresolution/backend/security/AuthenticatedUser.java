package com.aicoresolution.backend.security;

public record AuthenticatedUser(Long id, String username, String role) {
}
