/**
 * Centralized auth storage keys used across services.
 * All localStorage access for authentication must go through these constants
 * to ensure consistency between authService, axiosClient, and authUtils.
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
  USER_ID: 'userId',
} as const;
