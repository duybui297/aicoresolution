import { useState, useCallback, useEffect } from 'react';
import postService, { type MediaUploadResponse } from '../services/postService';

const STORAGE_KEY = 'cms_content_gallery';

/** Gallery image stored in localStorage */
export interface GalleryImage {
  id: number;
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

/** Restores GalleryImage from serialized JSON (fileSize may be 0 for legacy entries) */
function deserialize(raw: Record<string, unknown>): GalleryImage {
  return {
    id: Number(raw.id ?? raw.mediaId ?? 0),
    fileUrl: String(raw.fileUrl || ''),
    fileName: String(raw.fileName || ''),
    fileSize: Number(raw.fileSize || 0),
  };
}

function loadFromStorage(): GalleryImage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    return parsed.map(deserialize).filter((img) => img.id > 0 && img.fileUrl);
  } catch {
    return [];
  }
}

function saveToStorage(images: GalleryImage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  } catch {
    // Storage quota exceeded — silently ignore
  }
}

interface UseSharedGalleryReturn {
  images: GalleryImage[];
  upload: (file: File) => Promise<GalleryImage>;
  remove: (id: number) => void;
  clear: () => void;
  /** Merge external images (e.g. from existing post) into gallery without re-uploading */
  seed: (externals: GalleryImage[]) => void;
  isUploading: boolean;
}

export function useSharedGallery(): UseSharedGalleryReturn {
  const [images, setImages] = useState<GalleryImage[]>(loadFromStorage);
  const [isUploading, setIsUploading] = useState(false);

  // Sync to localStorage whenever images change
  useEffect(() => {
    saveToStorage(images);
  }, [images]);

  const seed = useCallback((externals: GalleryImage[]) => {
    setImages((prev) => {
      const existingIds = new Set(prev.map((img) => img.id));
      const newOnes = externals.filter((img) => !existingIds.has(img.id) && img.id > 0 && img.fileUrl);
      return newOnes.length > 0 ? [...prev, ...newOnes] : prev;
    });
  }, []);

  const upload = useCallback(async (file: File): Promise<GalleryImage> => {
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Image must be less than 10 MB.');
    }

    setIsUploading(true);
    try {
      const media: MediaUploadResponse = await postService.uploadMedia(file);
      const galleryImage: GalleryImage = {
        id: media.id,
        fileUrl: media.fileUrl,
        fileName: media.fileName,
        fileSize: media.fileSize,
      };

      setImages((prev) => {
        // Avoid duplicates by ID
        if (prev.some((img) => img.id === media.id)) return prev;
        return [galleryImage, ...prev];
      });

      return galleryImage;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const remove = useCallback((id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  const clear = useCallback(() => {
    setImages([]);
  }, []);

  return { images, upload, remove, clear, seed, isUploading };
}
