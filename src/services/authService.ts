import axiosClient from './axiosClient';
import { LoginRequest, LoginResponse, ApiResponse } from '../types/api';

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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      console.error('Login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  logout: async (): Promise<ApiResponse<any>> => {
    const refreshToken = localStorage.getItem('refreshToken');
    let response: any = null;
    
    if (refreshToken) {
      try {
        response = await axiosClient.post('auth/logout', { refreshToken });
      } catch (error) {
        console.error('Logout API failed:', error);
      }
    }
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');

    return response || { success: true, message: 'Logged out' };
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
