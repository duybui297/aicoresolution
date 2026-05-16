import { ForwardRefRenderFunction, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, X } from 'lucide-react';
import DateTimePicker from './DateTimePicker';
import { RichTextEditor } from './RichTextEditor';
import { SharedMediaGallery } from './SharedMediaGallery';
import { type ArticleLanguage } from './LanguageToggle';
import { type GalleryImage } from '../../hooks/useSharedGallery';
import postService from '../../services/postService';
import { Languages } from 'lucide-react';


interface SharedImageSectionProps {
  uploadStatus: 'idle' | 'uploading' | 'uploaded' | 'error';
  imageFile: File | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  previewImageUrl?: string;
  error?: string;
}

function SharedImageSection({
  uploadStatus,
  imageFile,
  onImageSelect,
  onImageRemove,
  previewImageUrl,
  error,
}: SharedImageSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-admin-sm font-admin-semibold text-admin-netral-100">
          Image Cover <span className="text-admin-error-100">*</span>
        </span>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {uploadStatus === 'idle' || uploadStatus === 'error' ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-2xl flex flex-col items-center justify-center py-10 transition-colors cursor-pointer ${error ? 'border-admin-error-100 bg-admin-error-10/5 hover:bg-admin-error-10/10' : 'border-admin-netral-30 bg-[#FAFAFA] hover:bg-admin-netral-20'
            }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${error ? 'bg-admin-error-100 text-white' : 'bg-admin-primary-100 text-admin-secondary-100'}`}>
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className={`text-admin-sm font-admin-semibold mb-1 ${error ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>Upload images</p>
          <p className="text-admin-xs font-admin-regular text-admin-netral-50">Click to browse (10 MB max).</p>
          {uploadStatus === 'error' && (
            <p className="text-admin-xs text-admin-error-100 mt-2 font-admin-medium">Upload failed. Click to retry.</p>
          )}
        </div>
      ) : uploadStatus === 'uploading' ? (
        <div className="border border-dashed border-admin-netral-30 rounded-2xl p-6 bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E2E8F0] rounded-lg flex items-center justify-center shrink-0">
              <ImageIcon className="w-6 h-6 text-admin-netral-50" />
            </div>
            <div className="flex-1">
              <p className="text-admin-xs font-admin-regular text-admin-netral-100 mb-2">{imageFile?.name ?? 'Uploading...'}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-admin-netral-20 rounded-full overflow-hidden">
                  <div className="h-full bg-admin-info-100 rounded-full animate-pulse w-3/4" />
                </div>
                <span className="text-admin-xs text-admin-netral-50">Uploading...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-admin-netral-30 rounded-2xl p-5 bg-[#FAFAFA]">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-20 h-20 bg-[#E2E8F0] rounded-xl flex items-center justify-center overflow-hidden shrink-0">
              {previewImageUrl ? (
                <img src={previewImageUrl} alt="cover" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-admin-netral-40" />
              )}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-admin-sm font-admin-regular text-admin-netral-100 truncate max-w-[200px]">
                    {imageFile?.name || 'current-image.jpg'}
                  </p>
                  <p className="text-admin-2xs font-admin-regular text-admin-netral-50">
                    {imageFile ? `${(imageFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                  </p>
                </div>
                <button onClick={onImageRemove} className="text-admin-netral-60 hover:text-admin-netral-100 shrink-0 ml-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {imageFile && (
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex-1 h-1.5 bg-admin-netral-20 rounded-full overflow-hidden">
                    <div className="h-full bg-admin-info-100 w-full rounded-full" />
                  </div>
                  <span className="text-admin-xs text-admin-netral-100 shrink-0">100%</span>
                </div>
              )}
            </div>
          </div>
          <button onClick={() => fileInputRef.current?.click()}
            className="px-5 py-2 border border-admin-netral-30 rounded-lg text-admin-xs text-admin-netral-100 bg-white hover:bg-admin-netral-10 transition-colors">
            Change image
          </button>
        </div>
      )}

      {error && <p className="text-admin-xs text-admin-error-100 font-admin-medium">{error}</p>}
    </div>
  );
}

// ── Single-language content panel ─────────────────────────────────────

interface ContentPanelProps {
  language: ArticleLanguage;
  headline: string; setHeadline: (v: string) => void;
  excerpt: string; setExcerpt: (v: string) => void;
  imageCaption: string; setImageCaption: (v: string) => void;
  content: string; setContent: (v: string) => void;
  /** Shared gallery images for this article */
  galleryImages: GalleryImage[];
  errors: Record<string, string>;
  validateField: (name: string, value: unknown) => void;
}

const ContentPanel = ({
  language,
  headline,
  setHeadline,
  excerpt,
  setExcerpt,
  imageCaption,
  setImageCaption,
  content,
  setContent,
  galleryImages,
  errors,
  validateField,
}: ContentPanelProps) => {
  const prefix = language === 'vi' ? 'vi' : 'en';

  const uploadToEditor = async (file: File) => {
    const res = await postService.uploadMedia(file);
    return { fileUrl: res.fileUrl };
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Headline */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-1 ${errors[`${prefix}Headline`] ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Headline <span className="text-admin-error-100">*</span>
        </label>
        <p className="text-admin-xs font-admin-regular text-admin-netral-90 mb-2">
          Make sure that the headline you input is more than 90 characters.
        </p>
        <input
          type="text" placeholder="Headline" value={headline}
          onChange={(e) => { setHeadline(e.target.value); validateField(`${prefix}Headline`, e.target.value); }}
          onBlur={(e) => validateField(`${prefix}Headline`, e.target.value)}
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors placeholder:text-admin-netral-40 ${errors[`${prefix}Headline`] ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
            }`}
        />
        {errors[`${prefix}Headline`] && (
          <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors[`${prefix}Headline`]}</p>
        )}
        <div className="text-admin-xs text-right mt-1 text-admin-netral-50">{headline.length} characters</div>
      </div>

      {/* Excerpt */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-1 ${errors[`${prefix}Excerpt`] ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Excerpt <span className="text-admin-error-100">*</span>
        </label>
        <p className="text-admin-xs font-admin-regular text-admin-netral-90 mb-2">
          Describe your content in less than 500 characters.
        </p>
        <input
          type="text" placeholder="Description" value={excerpt}
          onChange={(e) => { setExcerpt(e.target.value); validateField(`${prefix}Excerpt`, e.target.value); }}
          onBlur={(e) => validateField(`${prefix}Excerpt`, e.target.value)}
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors placeholder:text-admin-netral-40 ${errors[`${prefix}Excerpt`] ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
            }`}
        />
        {errors[`${prefix}Excerpt`] && (
          <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors[`${prefix}Excerpt`]}</p>
        )}
        <div className={`text-admin-xs text-right mt-1 ${excerpt.length > 500 ? 'text-admin-error-100 font-admin-semibold' : 'text-admin-netral-50'}`}>
          {excerpt.length}/500
        </div>
      </div>

      {/* Image Caption */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-1 ${errors[`${prefix}Caption`] ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Image caption <span className="text-admin-error-100">*</span>
        </label>
        <input
          type="text" placeholder="Caption" value={imageCaption}
          onChange={(e) => { setImageCaption(e.target.value); validateField(`${prefix}Caption`, e.target.value); }}
          onBlur={(e) => validateField(`${prefix}Caption`, e.target.value)}
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors bg-white ${errors[`${prefix}Caption`] ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
            }`}
        />
        {errors[`${prefix}Caption`] && (
          <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors[`${prefix}Caption`]}</p>
        )}
      </div>

      {/* Content Editor */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-2 ${errors[`${prefix}Content`] ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Content article <span className="text-admin-error-100">*</span>
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          error={errors[`${prefix}Content`]}
          onBlur={(val) => validateField(`${prefix}Content`, val)}
          uploadMedia={uploadToEditor}
          galleryImages={galleryImages}
          onInsertGalleryImage={(img) => setContent(content + `<p><img src="${img.fileUrl}" alt="${img.fileName}" /></p>`)}
        />
        {errors[`${prefix}Content`] && (
          <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors[`${prefix}Content`]}</p>
        )}
      </div>
    </div>
  );
};

interface ArticleFormProps {
  activeLanguage: ArticleLanguage;
  setActiveLanguage: (lang: ArticleLanguage) => void;

  // VI
  headlineVi: string; setHeadlineVi: (v: string) => void;
  excerptVi: string; setExcerptVi: (v: string) => void;
  imageCaptionVi: string; setImageCaptionVi: (v: string) => void;
  contentVi: string; setContentVi: (v: string) => void;

  // EN
  headlineEn: string; setHeadlineEn: (v: string) => void;
  excerptEn: string; setExcerptEn: (v: string) => void;
  imageCaptionEn: string; setImageCaptionEn: (v: string) => void;
  contentEn: string; setContentEn: (v: string) => void;

  // Shared image cover
  uploadStatus: 'idle' | 'uploading' | 'uploaded' | 'error';
  imageFile: File | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  previewImageUrl?: string;

  // Shared content gallery
  galleryImages: GalleryImage[];
  onGalleryUpload: (file: File) => Promise<void>;
  onGalleryDelete?: (mediaId: number) => void;

  // Publication dates
  pubDateValue: string; setPubDateValue: (v: string) => void;
  scheduleDateValue: string; setScheduleDateValue: (v: string) => void;

  // Portal refs
  showPubDate: boolean; setShowPubDate: (v: boolean) => void;
  pubDatePos: { top: number; left: number };
  showScheduleDate: boolean; setShowScheduleDate: (v: boolean) => void;
  scheduleDatePos: { top: number; left: number };
  pubDateRef: React.RefObject<HTMLDivElement>;
  scheduleDateRef: React.RefObject<HTMLDivElement>;

  // Validation
  errors: Record<string, string>;
  validateField: (name: string, value: unknown) => void;
}

const ArticleForm: ForwardRefRenderFunction<HTMLDivElement, ArticleFormProps> = (props, ref) => {
  const {
    activeLanguage, setActiveLanguage,
    headlineVi, setHeadlineVi,
    excerptVi, setExcerptVi,
    imageCaptionVi, setImageCaptionVi,
    contentVi, setContentVi,
    headlineEn, setHeadlineEn,
    excerptEn, setExcerptEn,
    imageCaptionEn, setImageCaptionEn,
    contentEn, setContentEn,
    uploadStatus, imageFile, onImageSelect, onImageRemove, previewImageUrl,
    galleryImages, onGalleryUpload, onGalleryDelete,
    pubDateValue, setPubDateValue,
    scheduleDateValue, setScheduleDateValue,
    showPubDate, setShowPubDate, pubDatePos,
    showScheduleDate, setShowScheduleDate, scheduleDatePos,
    pubDateRef, scheduleDateRef,
    errors, validateField,
  } = props;

  return (
    <div
      ref={ref}
      className="w-[61%] bg-admin-netral-10 border border-admin-netral-20 rounded-2xl p-6 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar pr-3"
    >
      {/* ── Language toggle header ─────────────────── */}
      <div className="flex items-center justify-between shrink-0 pb-4 border-b border-admin-netral-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveLanguage('vi')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-admin-xs font-admin-semibold transition-all ${activeLanguage === 'vi'
                ? 'bg-admin-primary-100 text-admin-netral-10 border-admin-primary-100'
                : 'bg-white text-admin-netral-60 border-admin-netral-30 hover:border-admin-primary-100 hover:text-admin-primary-100'
              }`}
          >
            <Languages className="w-5 h-5" />
            VI
          </button>
          <button
            onClick={() => setActiveLanguage('en')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-admin-xs font-admin-semibold transition-all ${activeLanguage === 'en'
                ? 'bg-admin-primary-100 text-admin-netral-10 border-admin-primary-100'
                : 'bg-white text-admin-netral-60 border-admin-netral-30 hover:border-admin-primary-100 hover:text-admin-primary-100'
              }`}
          >
            <Languages className="w-5 h-5" />
            EN
          </button>
        </div>
      </div>

      {/* ── Active language content panel ──────────── */}
      <div className="bg-white border border-admin-netral-20 rounded-xl p-5">
        {activeLanguage === 'vi' ? (
          <ContentPanel
            language="vi"
            headline={headlineVi} setHeadline={setHeadlineVi}
            excerpt={excerptVi} setExcerpt={setExcerptVi}
            imageCaption={imageCaptionVi} setImageCaption={setImageCaptionVi}
            content={contentVi} setContent={setContentVi}
            galleryImages={galleryImages}
            errors={errors}
            validateField={validateField}
          />
        ) : (
          <ContentPanel
            language="en"
            headline={headlineEn} setHeadline={setHeadlineEn}
            excerpt={excerptEn} setExcerpt={setExcerptEn}
            imageCaption={imageCaptionEn} setImageCaption={setImageCaptionEn}
            content={contentEn} setContent={setContentEn}
            galleryImages={galleryImages}
            errors={errors}
            validateField={validateField}
          />
        )}
      </div>

      {/* ── Shared Image Cover ──────────────────────── */}
      <div className="bg-white border border-admin-netral-20 rounded-xl p-5 flex flex-col gap-4">

        <SharedMediaGallery
          images={galleryImages}
          onUpload={onGalleryUpload}
          onInsert={(img) => {
            // Insert into the active language's content
            if (activeLanguage === 'vi') {
              setContentVi(contentVi + `<p><img src="${img.fileUrl}" alt="${img.fileName}" style="width:100%;border-radius:8px;margin:1rem 0" /></p>`);
            } else {
              setContentEn(contentEn + `<p><img src="${img.fileUrl}" alt="${img.fileName}" style="width:100%;border-radius:8px;margin:1rem 0" /></p>`);
            }
          }}
          onDelete={onGalleryDelete}
        />

        <div className="border-t border-admin-netral-10 pt-4">
          <SharedImageSection
            uploadStatus={uploadStatus}
            imageFile={imageFile}
            onImageSelect={onImageSelect}
            onImageRemove={onImageRemove}
            previewImageUrl={previewImageUrl}
            error={errors.image}
          />
        </div>

        {/* Publication Date */}
        <div className="flex flex-col relative" ref={pubDateRef}>
          <label className={`text-admin-base font-admin-regular mb-1 ${errors.pubDate ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
            Publication date
          </label>
          <input
            type="text" readOnly
            onClick={() => setShowPubDate(!showPubDate)}
            value={pubDateValue}
            placeholder="DD/MM/YYYY (Time optional)"
            className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors mt-2 cursor-pointer bg-white ${errors.pubDate ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
              }`}
          />
          {errors.pubDate && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.pubDate}</p>}
          {showPubDate && createPortal(
            <div id="date-picker-portal" className="fixed z-[100] drop-shadow-2xl"
              style={{ top: pubDatePos.top, left: pubDatePos.left }}
              onClick={(e) => e.stopPropagation()}>
              <DateTimePicker
                onClose={() => setShowPubDate(false)}
                onApply={(val) => { setPubDateValue(val); validateField('pubDate', val); }}
              />
            </div>,
            document.body
          )}
        </div>

        {/* Publishing Schedule */}
        <div className="flex flex-col relative" ref={scheduleDateRef}>
          <label className={`text-admin-base font-admin-regular mb-1 ${errors.scheduleDate ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
            Publishing Schedule
          </label>
          <input
            type="text" readOnly
            onClick={() => setShowScheduleDate(!showScheduleDate)}
            value={scheduleDateValue}
            placeholder="DD/MM/YYYY (Time optional)"
            className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors mt-2 cursor-pointer bg-white ${errors.scheduleDate ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
              }`}
          />
          {errors.scheduleDate && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.scheduleDate}</p>}
          {showScheduleDate && createPortal(
            <div id="date-picker-portal" className="fixed z-[100] drop-shadow-2xl"
              style={{ top: scheduleDatePos.top, left: scheduleDatePos.left }}
              onClick={(e) => e.stopPropagation()}>
              <DateTimePicker
                onClose={() => setShowScheduleDate(false)}
                onApply={(val) => { setScheduleDateValue(val); validateField('scheduleDate', val); }}
              />
            </div>,
            document.body
          )}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ArticleForm);
