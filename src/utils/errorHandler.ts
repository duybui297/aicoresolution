import axios from 'axios';

/**
 * Interface for consistent error objects
 */
export interface AppError {
  message: string;
  code?: string | number;
  details?: any;
  isNetworkError?: boolean;
}

const AUTH_ERROR_KEYS: Record<string, string> = {
  'Invalid username/email or password': 'auth.adminLogin.errorInvalidCredentials',
  'Invalid username or password': 'auth.adminLogin.errorInvalidCredentials',
  'User account is not active': 'auth.adminLogin.errorAccountInactive',
};
export const extractErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    // Connection Error (No response from server)
    if (!err.response) {
      if (err.code === 'ECONNABORTED') return 'Connection timed out. Please try again.';
      return 'Server Connection Failed. Please check your internet or contact support.';
    }

    const status = err.response.status;
    const data = err.response.data;
    const backendMessage: string = data?.message || '';

    if (status === 401 && backendMessage) {
      return backendMessage;
    }

    // Specific status handling
    switch (status) {
      case 400:
      case 422:
        if (data?.errors && typeof data.errors === 'object') {
          return Object.values(data.errors).flat().join(' ');
        }
        return data?.message || 'Invalid data. Please check your inputs.';
      case 401:
        return 'Session expired or unauthorized. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 413:
        return 'The uploaded file is too large (max 10MB).';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'Server error (500). Our team has been notified. Please try again later.';
      default:
        return data?.message || data?.error || `Unexpected error occurred (${status})`;
    }
  }

  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Maps a backend auth error message to its corresponding i18n translation key.
 * Returns the translated string using the active locale.
 */
export const mapAuthErrorToI18n = (message: string, t: (key: string) => string): string => {
  const key = AUTH_ERROR_KEYS[message];
  return key ? t(key) : message;
};

/**
 * Creates a structured AppError object
 */
export const handleError = (err: unknown): AppError => {
  const message = extractErrorMessage(err);
  const isNetworkError = axios.isAxiosError(err) && !err.response;
  
  return {
    message,
    isNetworkError,
    code: axios.isAxiosError(err) ? err.response?.status : undefined,
    details: axios.isAxiosError(err) ? err.response?.data : undefined
  };
};
