import { useRef, useState } from 'react';
import { Image as ImageIcon, Upload, X, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';

export interface GalleryImage {
  id: number;
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

interface SharedMediaGalleryProps {
  images: GalleryImage[];
  onUpload: (file: File) => Promise<void>;
  onInsert: (image: GalleryImage) => void;
  onDelete?: (id: number) => void;
  uploading?: boolean;
}

export function SharedMediaGallery({
  images,
  onUpload,
  onInsert,
  onDelete,
  uploading = false,
}: SharedMediaGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await onUpload(file);
      e.target.value = '';
    }
  };

  const handleInsert = (img: GalleryImage) => {
    onInsert(img);
    setCopiedId(img.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* ── Header row ──────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-admin-primary-100" />
          <span className="text-admin-sm font-admin-semibold text-admin-netral-100">
            Content Gallery
          </span>
          {images.length > 0 && (
            <span className="text-admin-2xs font-admin-medium text-admin-primary-100 bg-admin-primary-10 border border-admin-primary-100/20 rounded-full px-2 py-0.5">
              {images.length} image{images.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Upload button */}
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-admin-xs font-admin-medium border border-admin-primary-100 text-admin-primary-100 rounded-lg hover:bg-admin-primary-10 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            Upload image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Expand / collapse */}
          {images.length > 0 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 px-2 py-1.5 text-admin-xs font-admin-medium text-admin-netral-60 hover:text-admin-netral-100 transition-colors rounded-lg hover:bg-admin-netral-10"
            >
              {isExpanded ? (
                <><ChevronUp className="w-3.5 h-3.5" /> Hide</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" /> Show</>
              )}
            </button>
          )}
        </div>
      </div>

      {/* ── Empty state ──────────────────────────── */}
      {images.length === 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-admin-netral-10 border border-dashed border-admin-netral-30 rounded-lg">
          <ImageIcon className="w-5 h-5 text-admin-netral-40 shrink-0" />
          <div>
            <p className="text-admin-xs font-admin-medium text-admin-netral-60">
              No content images yet
            </p>
            <p className="text-admin-2xs font-admin-regular text-admin-netral-50">
              Upload images here and insert them into either VI or EN content.
            </p>
          </div>
        </div>
      )}

      {/* ── Image grid ──────────────────────────── */}
      {isExpanded && images.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              draggable
              onDragOver={(e) => { e.preventDefault(); setDragOverIndex(img.id); }}
              onDragLeave={() => setDragOverIndex(null)}
              onDrop={() => setDragOverIndex(null)}
              className={`group relative rounded-xl overflow-hidden border transition-all ${
                dragOverIndex === img.id
                  ? 'border-admin-primary-100 ring-2 ring-admin-primary-100/30'
                  : 'border-admin-netral-20 hover:border-admin-primary-100'
              }`}
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-admin-netral-10">
                <img
                  src={img.fileUrl}
                  alt={img.fileName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                {/* Insert button */}
                <button
                  type="button"
                  onClick={() => handleInsert(img)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-admin-xs font-admin-semibold transition-colors ${
                    copiedId === img.id
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-admin-netral-100 hover:bg-admin-primary-100 hover:text-white'
                  }`}
                >
                  {copiedId === img.id ? (
                    <><Check className="w-3 h-3" /> Inserted</>
                  ) : (
                    <><Check className="w-3 h-3" /> Insert</>
                  )}
                </button>

                {/* Delete button */}
                {onDelete && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(img.id); }}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Filename */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1.5 py-1 truncate">
                <p className="text-admin-2xs font-admin-regular text-white/80 truncate">
                  {img.fileName}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
