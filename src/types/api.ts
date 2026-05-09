export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresInSeconds: number;
  userId: number;
  role: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'DELETED' | 'ARCHIVED' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type ContentFormat = 'MARKDOWN' | 'HTML';
export type MediaRole = 'CONTENT' | 'GALLERY' | 'THUMBNAIL' | 'ATTACHMENT';

export interface PostMediaResponse {
  mediaId: number;
  sortOrder?: number;
  role: MediaRole;
  fileUrl?: string;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export interface PostResponse {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  contentFormat: ContentFormat;
  thumbnailUrl: string;
  thumbnailAlt?: string;
  status: PostStatus;
  publishedAt: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  authorName?: string;
  viewCount: number;
  categoryId?: number;
  categoryName?: string;
  categorySlug?: string;
  media?: PostMediaResponse[];
}
