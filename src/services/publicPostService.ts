import axios from 'axios';

const PUBLIC_API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1').replace(/\/$/, '') + '/';

export interface PublicPostResponse {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentFormat: 'MARKDOWN' | 'HTML';
  thumbnailUrl: string;
  thumbnailAlt?: string;
  status: string;
  publishedAt: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  authorName?: string;
  viewCount: number;
}

export interface PublicPostListResponse {
  content: PublicPostResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

const publicPostService = {
  getPosts: (page = 0, size = 10): Promise<PublicPostListResponse> => {
    return axios.get(`${PUBLIC_API_URL}posts`, { params: { page, size } }).then(res => res.data);
  },

  getPostBySlug: (slug: string): Promise<PublicPostResponse> => {
    return axios.get(`${PUBLIC_API_URL}posts/${slug}`).then(res => res.data);
  },
};

export default publicPostService;
