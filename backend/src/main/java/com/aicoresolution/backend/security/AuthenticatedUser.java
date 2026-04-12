package com.aicoresolution.backend.security;

import java.util.UUID;

public record AuthenticatedUser(UUID id, String username, String role) {
}
