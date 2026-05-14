import axiosClient from './axiosClient';
import { PostResponse, PostStatus } from '../types/api';
import { getFullImageUrl } from '../utils/imageUtils';

export interface PageResponse<T> {
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

  deletePost: (id: number): Promise<unknown> => {
    return axiosClient.delete(`admin/posts/${id}`);
  },

  deletePostsBatch: (ids: number[]): Promise<unknown> => {
    return axiosClient.delete('admin/posts/batch-delete', { data: { ids } });
  },

  unpublishPost: (id: number): Promise<PostResponse> => {
    return axiosClient.patch(`admin/posts/${id}/unpublish`);
  },

  /** Public API — fetch paginated list of published posts (for /news page) */
  getPublicPosts: (
    page = 0,
    size = 10
  ): Promise<PageResponse<PostResponse>> => {
    const baseURL = axiosClient.defaults.baseURL || 'http://localhost:8080/api/v1';
    const publicBaseURL = baseURL.replace(/\/admin(\/|$)/, '/posts$1');
    return axiosClient.get('posts', {
      baseURL: publicBaseURL,
      params: { page, size },
    });
  },

  /** Public API — fetch a single published post by slug (for /news/:id page) */
  getPublicPostBySlug: (slug: string): Promise<PostResponse> => {
    const baseURL = axiosClient.defaults.baseURL || 'http://localhost:8080/api/v1';
    const publicBaseURL = baseURL.replace(/\/admin(\/|$)/, '/posts$1');
    return axiosClient.get(`posts/${slug}`, {
      baseURL: publicBaseURL,
    });
  },
};

/**
 * Map a PostResponse from the backend to the shape expected by News/NewsDetail components.
 * - Converts relative thumbnail URLs to absolute
 * - Maps category slug to i18n key for translation
 * - Extracts ordered content image URLs from post_media
 */
export const mapPostToNewsItem = (post: PostResponse) => {
  return {
    ...post,
    thumbnailUrl: getFullImageUrl(post.thumbnailUrl) || '',
    categoryKey: getCategoryI18nKey(post.categorySlug),
    contentImages: extractContentImages(post),
  };
};

const getCategoryI18nKey = (categorySlug?: string): string => {
  const categoryMap: Record<string, string> = {
    'ai-tools': 'news.categories.tips',
    'generative-ai': 'news.categories.trends',
    'ai-ung-dung': 'news.categories.company',
    'tri-tue-nhan-tao': 'news.categories.trends',
    'machine-learning': 'news.categories.trends',
    'deep-learning': 'news.categories.trends',
    'ai-ethics': 'news.categories.trends',
    'computer-vision': 'news.categories.trends',
    'xlngtu-nlp': 'news.categories.trends',
    'robotics': 'news.categories.trends',
  };
  return categorySlug ? (categoryMap[categorySlug] || 'news.categories.trends') : 'news.categories.trends';
};

const extractContentImages = (post: PostResponse): string[] => {
  if (!post.media || post.media.length === 0) return [];
  return post.media
    .filter(m => m.role === 'CONTENT')
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map(m => getFullImageUrl(m.fileUrl) || '')
    .filter(Boolean);
};

export default postService;
