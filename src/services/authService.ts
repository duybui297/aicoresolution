import axiosClient from './axiosClient';
import { LoginRequest, LoginResponse, ApiResponse } from '../types/api';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ROLE: 'userRole',
  USER_ID: 'userId',
} as const;

const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosClient.post<any, LoginResponse>('auth/login', credentials);
      
      // Save tokens to localStorage
      if (response.accessToken) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.accessToken);
      }
      if (response.refreshToken) {
        localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      }
      if (response.role) {
        localStorage.setItem(STORAGE_KEYS.USER_ROLE, response.role);
      }
      if (response.userId) {
        localStorage.setItem(STORAGE_KEYS.USER_ID, response.userId.toString());
      }
      
      return response;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  logout: async (): Promise<ApiResponse<any>> => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    let response: any = null;
    
    if (refreshToken) {
      try {
        response = await axiosClient.post('auth/logout', { refreshToken });
      } catch (error) {
        console.error('Logout API failed:', error);
      }
    }
    
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    localStorage.removeItem(STORAGE_KEYS.USER_ID);

    return response || { success: true, message: 'Logged out' };
  },

  getCurrentToken: () => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getUserRole: () => {
    return localStorage.getItem(STORAGE_KEYS.USER_ROLE);
  }
};

export default authService;
