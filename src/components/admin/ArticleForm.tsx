import React, { ForwardRefRenderFunction, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { Image as ImageIcon, X, Bold, Italic, Underline, Quote, ListOrdered, List, Link as LinkIcon } from 'lucide-react';
import DateTimePicker from './DateTimePicker';

interface ArticleFormProps {
  headline: string;
  setHeadline: (val: string) => void;
  excerpt: string;
  setExcerpt: (val: string) => void;
  pubDateValue: string;
  setPubDateValue: (val: string) => void;
  imageCaption: string;
  setImageCaption: (val: string) => void;
  content: string;
  setContent: (val: string) => void;
  scheduleDateValue: string;
  setScheduleDateValue: (val: string) => void;
  uploadStatus: 'idle' | 'uploading' | 'uploaded' | 'error';
  imageFile: File | null;
  onImageSelect: (file: File) => void;
  onImageRemove: () => void;
  
  // Portal Props
  showPubDate: boolean;
  setShowPubDate: (val: boolean) => void;
  pubDatePos: { top: number; left: number };
  showScheduleDate: boolean;
  setShowScheduleDate: (val: boolean) => void;
  scheduleDatePos: { top: number; left: number };
  
  pubDateRef: React.RefObject<HTMLDivElement>;
  scheduleDateRef: React.RefObject<HTMLDivElement>;

  // Validation
  errors: Record<string, string>;
  validateField: (name: string, value: any) => void;
}

const ArticleForm: ForwardRefRenderFunction<HTMLDivElement, ArticleFormProps> = (props, ref) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    headline, setHeadline,
    excerpt, setExcerpt,
    pubDateValue, setPubDateValue,
    imageCaption, setImageCaption,
    content, setContent,
    scheduleDateValue, setScheduleDateValue,
    uploadStatus, imageFile, onImageSelect, onImageRemove,
    showPubDate, setShowPubDate, pubDatePos,
    showScheduleDate, setShowScheduleDate, scheduleDatePos,
    pubDateRef, scheduleDateRef,
    errors, validateField
  } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelect(file);
    // Reset input so the same file can be re-selected after removal
    e.target.value = '';
  };

  return (
    <div 
      ref={ref} 
      className="w-[61%] bg-admin-netral-10 border border-admin-netral-20 rounded-2xl p-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar pr-3"
    >
      {/* Headline */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-1 ${errors.headline ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Headline <span className="text-admin-error-100">*</span>
        </label>
        <p className="text-admin-xs font-admin-regular text-admin-netral-90 mb-2">Make sure that the headline you input is more than 90 characters.</p>
        <input 
          type="text" 
          placeholder="Headline" 
          value={headline} 
          onChange={(e) => { setHeadline(e.target.value); validateField('headline', e.target.value); }} 
          onBlur={(e) => validateField('headline', e.target.value)}
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors placeholder:text-admin-netral-40 ${
            errors.headline ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
          }`} 
        />
        {errors.headline && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.headline}</p>}
        <div className="text-admin-xs text-right mt-1 text-admin-netral-50">
          {headline.length} characters
        </div>
      </div>

      {/* Excerpt */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-1 ${errors.excerpt ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Excerpt <span className="text-admin-error-100">*</span>
        </label>
        <p className="text-admin-xs font-admin-regular text-admin-netral-90 mb-2">Describe your content in less than 500 characters.</p>
        <input 
          type="text" 
          placeholder="Description" 
          value={excerpt} 
          onChange={(e) => { setExcerpt(e.target.value); validateField('excerpt', e.target.value); }} 
          onBlur={(e) => validateField('excerpt', e.target.value)}
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors placeholder:text-admin-netral-40 ${
            errors.excerpt ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
          }`} 
        />
        {errors.excerpt && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.excerpt}</p>}
        <div className={`text-admin-xs text-right mt-1 ${excerpt.length > 500 ? 'text-admin-error-100 font-admin-semibold' : 'text-admin-netral-50'}`}>
          {excerpt.length}/500
        </div>
      </div>

      {/* Publication Date */}
      <div className="flex flex-col relative" ref={pubDateRef}>
        <label className={`text-admin-base font-admin-regular mb-1 ${errors.pubDate ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Publication date <span className="text-admin-error-100">*</span>
        </label>
        <input 
          type="text" 
          readOnly 
          onClick={() => setShowPubDate(!showPubDate)} 
          value={pubDateValue} 
          placeholder="DD/MM/YYYY - HH:MM AM/PM" 
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors mt-2 cursor-pointer bg-white ${
            errors.pubDate ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
          }`} 
        />
        {errors.pubDate && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.pubDate}</p>}
        {showPubDate && createPortal(
          <div id="date-picker-portal" className="fixed z-[100] drop-shadow-2xl" style={{ top: pubDatePos.top, left: pubDatePos.left }} onClick={e => e.stopPropagation()}>
            <DateTimePicker onClose={() => setShowPubDate(false)} onApply={(val) => { setPubDateValue(val); validateField('pubDate', val); }} />
          </div>, document.body
        )}
      </div>

      {/* Image Cover */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-2 ${errors.image ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Image cover <span className="text-admin-error-100">*</span>
        </label>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {uploadStatus === 'idle' || uploadStatus === 'error' ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`border border-dashed rounded-2xl flex flex-col items-center justify-center py-10 transition-colors cursor-pointer ${
              errors.image ? 'border-admin-error-100 bg-admin-error-10/5 hover:bg-admin-error-10/10' : 'border-admin-netral-30 bg-[#FAFAFA] hover:bg-admin-netral-20'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${errors.image ? 'bg-admin-error-100 text-white' : 'bg-admin-primary-100 text-admin-secondary-100'}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <p className={`text-admin-sm font-admin-semibold mb-1 ${errors.image ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>Upload images</p>
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
          <div className="border border-dashed border-admin-netral-30 rounded-2xl p-6 bg-[#FAFAFA]">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-12 h-12 bg-[#E2E8F0] rounded-lg flex items-center justify-center overflow-hidden shrink-0 relative">
                {imageFile ? (
                  <img src={URL.createObjectURL(imageFile)} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-white absolute" />
                )}
              </div>
              <div className="flex flex-col flex-1 h-12 py-0.5 justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-admin-xs font-admin-regular text-admin-netral-100 truncate max-w-[180px]">{imageFile?.name ?? 'image-article.jpg'}</p>
                    <p className="text-admin-2xs font-admin-regular text-admin-netral-50">
                      {imageFile ? `${(imageFile.size / 1024 / 1024).toFixed(2)} MB` : ''}
                    </p>
                  </div>
                  <button onClick={onImageRemove} className="text-admin-netral-60 hover:text-admin-netral-100"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-admin-netral-20 rounded-full overflow-hidden">
                    <div className="h-full bg-admin-info-100 w-full rounded-full" />
                  </div>
                  <span className="text-admin-xs text-admin-netral-100">100%</span>
                </div>
              </div>
            </div>
            <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2 border border-admin-netral-30 rounded-lg text-admin-xs text-admin-netral-100 bg-white hover:bg-admin-netral-10 transition-colors">Change image</button>
          </div>
        )}
        {errors.image && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.image}</p>}
      </div>

      {/* Image Caption */}
      <div className={`flex flex-col ${uploadStatus === 'idle' ? 'opacity-60 pointer-events-none' : ''}`}>
        <label className={`text-admin-base font-admin-regular mb-1 ${errors.caption ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Image caption <span className="text-admin-error-100">*</span>
        </label>
        <input 
          type="text" 
          placeholder="Description" 
          value={imageCaption} 
          onChange={(e) => { setImageCaption(e.target.value); validateField('caption', e.target.value); }} 
          onBlur={(e) => validateField('caption', e.target.value)}
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors bg-white ${
            errors.caption ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
          }`} 
        />
        {errors.caption && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.caption}</p>}
      </div>

      {/* Content Article */}
      <div className="flex flex-col">
        <label className={`text-admin-base font-admin-regular mb-2 ${errors.content ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Content article <span className="text-admin-error-100">*</span>
        </label>
        <div className={`border rounded-lg flex flex-col transition-colors overflow-hidden ${
          errors.content ? 'border-admin-error-100' : 'border-admin-netral-20 focus-within:border-admin-primary-100'
        }`}>
          <div className="border-b border-admin-netral-20 p-2 flex items-center justify-center gap-6 bg-white flex-wrap">
            <div className="flex gap-3 text-xs font-admin-semibold"><button>H1</button><button>H2</button><button>H3</button><button>H4</button></div>
            <div className="w-px h-4 bg-admin-netral-30"></div>
            <div className="flex gap-3"><button><Bold className="w-4 h-4" /></button><button><Italic className="w-4 h-4" /></button><button><Underline className="w-4 h-4" /></button></div>
            <div className="w-px h-4 bg-admin-netral-30"></div>
            <div className="flex gap-3"><button><ImageIcon className="w-4 h-4" /></button><button><Quote className="w-4 h-4" /></button><button><ListOrdered className="w-4 h-4" /></button><button><List className="w-4 h-4" /></button><button><LinkIcon className="w-4 h-4" /></button></div>
          </div>
          <textarea 
            placeholder="Description" 
            value={content} 
            onChange={(e) => { setContent(e.target.value); validateField('content', e.target.value); }} 
            onBlur={(e) => validateField('content', e.target.value)}
            className={`w-full p-4 min-h-[200px] outline-none text-admin-base text-admin-netral-90 resize-y bg-white ${
              errors.content ? 'bg-admin-error-10/5' : ''
            }`} 
          />
        </div>
        {errors.content && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.content}</p>}
      </div>

      {/* Publishing Schedule */}
      <div className="flex flex-col relative" ref={scheduleDateRef}>
        <label className={`text-admin-base font-admin-regular mb-1 ${errors.scheduleDate ? 'text-admin-error-100' : 'text-admin-netral-100'}`}>
          Publishing Schedule
        </label>
        <input 
          type="text" 
          readOnly 
          onClick={() => setShowScheduleDate(!showScheduleDate)} 
          value={scheduleDateValue} 
          placeholder="DD/MM/YYYY - HH:MM AM/PM" 
          className={`border rounded-lg p-3 text-admin-base text-admin-netral-90 w-full outline-none transition-colors mt-2 cursor-pointer bg-white ${
            errors.scheduleDate ? 'border-admin-error-100 bg-admin-error-10/10' : 'border-admin-netral-20 focus:border-admin-primary-100'
          }`} 
        />
        {errors.scheduleDate && <p className="text-admin-xs text-admin-error-100 mt-1 font-admin-medium">{errors.scheduleDate}</p>}
        {showScheduleDate && createPortal(
          <div id="date-picker-portal" className="fixed z-[100] drop-shadow-2xl" style={{ top: scheduleDatePos.top, left: scheduleDatePos.left }} onClick={e => e.stopPropagation()}>
            <DateTimePicker onClose={() => setShowScheduleDate(false)} onApply={(val) => { setScheduleDateValue(val); validateField('scheduleDate', val); }} />
          </div>, document.body
        )}
      </div>
    </div>
  );
};

export default forwardRef(ArticleForm);
