import axios from 'axios';
import { ROUTE_PATHS } from '../utils/routeConstants';
import { STORAGE_KEYS } from '../utils/authStorageKeys';

// Base API URL
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1').replace(/\/$/, '') + '/';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle unwrapping and errors
axiosClient.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
      if (res.success) return res.data;
      return Promise.reject(res);
    }
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    const response = error.response;
    
    // Trích xuất message lỗi tập trung
    const { extractErrorMessage } = await import('../utils/errorHandler');
    const { clearAuthStorage } = await import('../utils/authUtils');
    const errorMessage = extractErrorMessage(error);

    // Handle 401 Unauthorized
    if (response?.status === 401 && !originalRequest._retry) {
      // Nếu đang ở trang login thì không refresh
      if (originalRequest.url?.includes('auth/login')) {
        return Promise.reject(new Error(errorMessage));
      }

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (refreshToken) {
        try {
          // Thử refresh token
          const res = await axios.post(`${API_URL}auth/refresh`, { refreshToken });
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
          if (newRefreshToken) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

          // Update header and retry
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          // Refresh thất bại -> Logout sạch sẽ
          clearAuthStorage();
          window.location.href = ROUTE_PATHS.adminLogin;
          return Promise.reject(refreshError);
        }
      } else {
        // Không có refresh token -> Logout
        clearAuthStorage();
        window.location.href = ROUTE_PATHS.adminLogin;
      }
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;
