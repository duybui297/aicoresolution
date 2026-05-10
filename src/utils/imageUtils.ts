/**
 * Trả về đường dẫn tuyệt đối cho ảnh.
 * Nếu URL đã có http/https hoặc là blob (preview), trả về nguyên bản.
 * Nếu là đường dẫn tương đối (bắt đầu bằng /), gắn thêm BASE_URL của Backend.
 */
export const getFullImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  
  if (url.startsWith('blob:') || url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
  
  // Đảm bảo url bắt đầu bằng /
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  
  return `${BASE_URL}${normalizedUrl}`;
};
