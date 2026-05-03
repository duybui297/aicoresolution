import axiosClient from './axiosClient';
import { PostResponse, ApiResponse } from '../types/api';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

const postService = {
  getPosts: async (page = 0, size = 10, status?: string): Promise<PageResponse<PostResponse>> => {
    return axiosClient.get('admin/posts', {
      params: { page, size, status }
    });
  },

  getPostById: async (id: number): Promise<PostResponse> => {
    return axiosClient.get(`admin/posts/${id}`);
  },

  deletePost: async (id: number): Promise<ApiResponse<any>> => {
    return axiosClient.delete(`admin/posts/${id}`);
  },

  batchDeletePosts: async (ids: number[]): Promise<ApiResponse<any>> => {
    return axiosClient.delete('admin/posts/batch-delete', { data: { ids } });
  }
};

export default postService;
