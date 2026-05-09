import axiosClient from './axiosClient';
import { PostResponse } from '../types/api';

interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

const publicPostService = {
  getPosts: (
    page = 0, 
    size = 10,
    sort?: string,
    locale?: string
  ): Promise<PageResponse<PostResponse>> => {
    return axiosClient.get('posts', { 
      params: { 
        page, 
        size,
        sort,
        locale
      } 
    });
  },

    getPostBySlug: (slug: string, locale?: string): Promise<PostResponse> => {
        return axiosClient.get(`posts/${slug}`, {
            params: { locale }
        });
    }
};

export default publicPostService;
