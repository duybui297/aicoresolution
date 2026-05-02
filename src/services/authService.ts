import axiosClient from './axiosClient';
import { LoginRequest, LoginResponse } from '../types/api';

const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await axiosClient.post<any, LoginResponse>('auth/login', credentials);
      
      // Save tokens to localStorage
      if (response.accessToken) {
        localStorage.setItem('accessToken', response.accessToken);
      }
      if (response.refreshToken) {
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      if (response.role) {
        localStorage.setItem('userRole', response.role);
      }
      if (response.userId) {
        localStorage.setItem('userId', response.userId.toString());
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  },

  getCurrentToken: () => {
    return localStorage.getItem('accessToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  },

  getUserRole: () => {
    return localStorage.getItem('userRole');
  }
};

export default authService;
