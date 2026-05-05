import axios from 'axios';
import { ROUTE_PATHS } from '../utils/routeConstants';
import { STORAGE_KEYS } from './authService';
import { clearAuthStorage } from '../utils/authUtils';

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
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag and queue to handle multiple 401s at once
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleLogout = () => {
  clearAuthStorage();
  window.location.href = ROUTE_PATHS.adminLogin;
};

// Response interceptor: handle global errors and token refresh
axiosClient.interceptors.response.use(
  (response) => {
    // Nếu backend trả về cấu trúc ApiResponse chuẩn { success, data, message }
    // thì ta unwrap lớp .data ra để các service dùng trực tiếp payload
    const res = response.data;
    if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
      if (res.success) {
        return res.data;
      }
      // Nếu success: false thì coi như lỗi (tùy thiết kế backend, có thể reject ở đây)
      return Promise.reject(res);
    }
    return res;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not a login request
    if (error.response?.status === 401 && !originalRequest.url?.includes('auth/login')) {
      
      // If we already tried to refresh and failed, logout
      if (originalRequest._retry) {
        handleLogout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosClient(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      if (!refreshToken) {
        handleLogout();
        return Promise.reject(error);
      }

      try {
        // Use standard axios to avoid infinite loops with interceptor
        const response = await axios.post(`${API_URL}auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);

        axiosClient.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        processQueue(null, accessToken);
        
        originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        handleLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;
