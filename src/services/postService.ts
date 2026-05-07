import axiosClient from './axiosClient';
import { PostResponse, ApiResponse, PostStatus } from '../types/api';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface MediaUploadResponse {
  id: number;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  altText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CreatePostPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnailUrl?: string;
  thumbnailAlt?: string;
  status: PostStatus;
  publishedAt?: string;
  scheduledAt?: string;
  mediaIds?: { mediaId: number; sortOrder: number; role: 'CONTENT' | 'GALLERY' | 'ATTACHMENT' }[];
}

export const parseDateStringToISO = (dateStr: string): string | null => {
  if (!dateStr) return null;
  // Match DD/MM/YYYY optionally followed by " - HH:MM AM/PM"
  const match = dateStr.match(/^(\d{2})\/(\d{2})\/(\d{4})(?:\s*-\s*(\d{2}):(\d{2})\s*(AM|PM))?$/i);
  if (!match) return null;
  
  const [, dd, mm, yyyy, hh, min, period] = match;
  
  let hour = 0;
  let minute = '00';
  
  if (hh && min && period) {
    hour = parseInt(hh, 10);
    minute = min;
    if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
    if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
  }
  
  return `${yyyy}-${mm}-${dd}T${String(hour).padStart(2, '0')}:${minute}:00`;
};

export const generateSlug = (text: string): string => {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 200);
};

const postService = {
  getPosts: (
    page = 0, 
    size = 10, 
    statuses?: string | string[], 
    sort?: string,
    search?: string,
    startDate?: string,
    endDate?: string,
    role?: string
  ): Promise<PageResponse<PostResponse>> => {
    // Convert statuses to array if it's a string, then join with comma for backend List<String>
    const statusParam = Array.isArray(statuses) ? statuses.join(',') : statuses;
    
    return axiosClient.get('admin/posts', { 
      params: { 
        page, 
        size, 
        statuses: statusParam, 
        sort,
        search,
        startDate,
        endDate,
        role
      } 
    });
  },

  getPostById: (id: number): Promise<PostResponse> => {
    return axiosClient.get(`admin/posts/${id}`);
  },

  uploadMedia: (file: File, altText?: string, caption?: string): Promise<MediaUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    if (altText) formData.append('altText', altText);
    if (caption) formData.append('caption', caption);
    return axiosClient.post('admin/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  createPost: (payload: CreatePostPayload): Promise<PostResponse> => {
    return axiosClient.post('admin/posts', payload);
  },

  updatePost: (id: number, payload: CreatePostPayload): Promise<PostResponse> => {
    return axiosClient.put(`admin/posts/${id}`, payload);
  },

  deletePost: (id: number): Promise<any> => {
    return axiosClient.delete(`admin/posts/${id}`);
  },

  deletePostsBatch: (ids: number[]): Promise<any> => {
    return axiosClient.delete('admin/posts/batch-delete', { data: { ids } });
  }
};

export default postService;
