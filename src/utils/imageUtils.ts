/**
 * Trả về đường dẫn tuyệt đối cho ảnh.
 * Nếu URL đã có http/https hoặc là blob (preview), trả về nguyên bản.
 * Nếu là đường dẫn tương đối (bắt đầu bằng /), gắn thêm BASE_URL của Backend.
 */
export const getFullImageUrl = (url?: string): string | undefined => {
  if (!url) return undefined;
  
  // Nếu là blob (cho instant preview) hoặc đã có http/https thì trả về luôn
  if (url.startsWith('blob:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
  
  // Đảm bảo url bắt đầu bằng /
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  
  return `${BASE_URL}${normalizedUrl}`;
};

/**
 * Transform HTML content to ensure all <img> tags have full URLs.
 */
export const transformHtmlContent = (html?: string): string => {
  if (!html) return '';
  
  const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
  
  // Replace relative src in img tags with absolute ones
  return html.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('blob:')) {
      return match;
    }
    
    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    const fullUrl = `${BASE_URL}${normalizedSrc}`;
    return match.replace(src, fullUrl);
  });
};

