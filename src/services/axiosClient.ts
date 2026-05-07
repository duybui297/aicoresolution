import axios from 'axios';
import { ROUTE_PATHS } from '../utils/routeConstants';

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
    // Nếu BE bọc trong ApiResponse { success, data, message }
    if (res && typeof res === 'object' && 'success' in res && 'data' in res) {
      if (res.success) return res.data;
      return Promise.reject(res);
    }
    // Nếu BE trả về trực tiếp (như Page object)
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    const response = error.response;
    
    // 1. Trích xuất message lỗi tập trung
    const { extractErrorMessage } = await import('../utils/errorHandler');
    const errorMessage = extractErrorMessage(error);

    // 2. Handle 401 Unauthorized (Logout)
    if (response?.status === 401) {
      localStorage.removeItem('accessToken');
      if (!originalRequest.url?.includes('auth/login')) {
        window.location.href = ROUTE_PATHS.adminLogin;
      }
    }

    // 3. Trả về Error object kèm message đã trích xuất
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;
