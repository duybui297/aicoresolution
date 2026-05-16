import { ArrowLeft, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { getFullImageUrl } from '../../utils/imageUtils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ArticleStatus } from '../../types/article';
import { type ArticleLanguage } from './LanguageToggle';

interface ArticlePreviewProps {
  headlineVi: string;
  headlineEn: string;
  excerptVi: string;
  excerptEn: string;
  contentVi: string;
  contentEn: string;
  captionVi: string;
  captionEn: string;
  activeLanguage: ArticleLanguage;

  pubDate: string;
  uploadStatus: 'idle' | 'uploaded';
  imageUrl?: string;

  mode: 'side' | 'expanded';
  type?: 'create' | 'edit';
  articleStatus?: ArticleStatus;
  onExpand?: () => void;
  onClose?: () => void;
  onNavigateBack?: () => void;
  onPublish?: () => void;
  onUnpublish?: () => void;
  onSaveDraft?: () => void;
  onBackToForm?: () => void;
  saveLabel?: string;
}

function pickLang<T>(vi: T, en: T, lang: ArticleLanguage): T {
  return lang === 'en' ? (en || vi) : (vi || en);
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  headlineVi, headlineEn,
  excerptVi, excerptEn,
  contentVi, contentEn,
  captionVi, captionEn,
  activeLanguage,
  pubDate,
  uploadStatus,
  imageUrl,
  mode,
  type = 'create',
  articleStatus,
  onExpand,
  onClose,
  onNavigateBack,
  onPublish,
  onUnpublish,
  onSaveDraft,
  onBackToForm,
  saveLabel,
}) => {
  const headline = pickLang(headlineVi, headlineEn, activeLanguage);
  const excerpt  = pickLang(excerptVi, excerptEn, activeLanguage);
  const content  = pickLang(contentVi, contentEn, activeLanguage);
  const caption  = pickLang(captionVi, captionEn, activeLanguage);

  if (mode === 'expanded') {
    return (
      <div className="fixed inset-0 bg-white z-[200] overflow-y-auto custom-scrollbar flex flex-col">
        {/* ── Expanded header ────────────────────────────────────── */}
        <div className="sticky top-0 bg-white border-b border-admin-netral-20 px-8 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-admin-sm font-admin-regular">
            <button
              onClick={onClose}
              className="text-admin-netral-50 hover:text-admin-primary-100 transition-colors mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateBack}
              className="text-admin-netral-50 hover:text-admin-primary-100 transition-colors"
            >
              Articles
            </button>
            <span className="text-admin-netral-20">/</span>
            <button
              onClick={onBackToForm || onClose}
              className="text-admin-netral-50 hover:text-admin-primary-100 transition-colors"
            >
              {type === 'create' ? 'Add new article' : 'Edit article'}
            </button>
            <span className="text-admin-netral-20">/</span>
            <span className="text-admin-netral-100 font-admin-semibold">Live preview</span>
          </div>
          <div className="flex items-center gap-4">
            {articleStatus === 'Published' && (
              <button
                onClick={onUnpublish}
                className="px-6 py-2.5 rounded-full text-admin-xs font-admin-medium border border-admin-warning-100/40 text-admin-warning-100 bg-admin-warning-10 hover:bg-admin-warning-20 transition-colors shrink-0"
              >
                Unpublish
              </button>
            )}
            <button
              onClick={onSaveDraft}
              className="px-6 py-2.5 rounded-full text-admin-xs font-admin-medium border border-admin-netral-30 text-admin-netral-100 bg-admin-netral-10 hover:bg-admin-netral-20 transition-colors shrink-0"
            >
              {saveLabel || (type === 'create' ? 'Save to draft' : 'Save changes')}
            </button>
            <button
              onClick={onPublish}
              className="bg-admin-primary-100 text-admin-netral-10 px-6 py-2.5 rounded-full text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors shrink-0"
            >
              {type === 'create' ? 'Publish' : 'Update'}
            </button>
          </div>
        </div>

        {/* ── Expanded content ───────────────────────────────────── */}
        <div className="max-w-[1000px] mx-auto w-full px-8 py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-6 text-center">
            <h1 className="text-[40px] font-admin-semibold text-admin-netral-100 leading-tight px-10">
              {headline || <span className="text-admin-netral-40 italic">No headline yet…</span>}
            </h1>
            <p className="text-admin-sm font-admin-regular text-admin-netral-60 italic">{pubDate}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[1000/458] bg-admin-netral-10 rounded-2xl overflow-hidden border border-admin-netral-20">
              {uploadStatus === 'uploaded' && imageUrl ? (
                <img
                  src={getFullImageUrl(imageUrl)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-admin-netral-10 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-admin-netral-20" />
                </div>
              )}
            </div>
            <p className="text-admin-sm font-admin-regular text-admin-netral-80 text-center italic">
              {caption}
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-[800px] mx-auto text-admin-base font-admin-regular text-admin-netral-90 leading-relaxed">
            {excerpt && (
              <p className="text-admin-lg font-admin-medium text-admin-netral-80 mt-4 italic">{excerpt}</p>
            )}
            <div className="prose prose-admin max-w-none prose-headings:font-admin-semibold prose-headings:text-admin-netral-100 prose-p:text-admin-netral-90 prose-strong:text-admin-netral-100 prose-blockquote:border-l-admin-primary-100 prose-blockquote:bg-admin-netral-10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-li:text-admin-netral-90">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content || ''}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Side preview mode ────────────────────────────────────────────────
  return (
    <div className="w-[39%] bg-white border border-admin-netral-20 rounded-2xl p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sticky top-0 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar pr-3">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-admin-lg font-admin-regular text-admin-netral-100">Live preview</h2>
        <button
          onClick={onExpand}
          className="text-admin-netral-50 hover:text-admin-primary-100 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-admin-lg font-admin-semibold text-admin-netral-100 leading-tight">
            {headline || <span className="text-admin-netral-40 italic text-admin-base">No headline yet…</span>}
          </h3>
          <p className="text-admin-sm font-admin-regular text-admin-netral-60">{pubDate}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full h-[261px] bg-admin-netral-20 rounded-lg flex items-center justify-center overflow-hidden">
            {uploadStatus === 'uploaded' && imageUrl ? (
              <img
                src={getFullImageUrl(imageUrl)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-admin-netral-20 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-admin-netral-30" />
              </div>
            )}
          </div>
          <p className="text-admin-xs font-admin-regular text-admin-netral-80 italic">{caption}</p>
        </div>

        {excerpt && (
          <p className="text-admin-base font-admin-medium text-admin-netral-80 mt-2 italic">{excerpt}</p>
        )}

        <div className="prose prose-sm prose-admin max-w-none prose-headings:font-admin-semibold prose-headings:text-admin-netral-100 prose-p:text-admin-netral-90 prose-strong:text-admin-netral-100 prose-blockquote:border-l-admin-primary-100 prose-blockquote:bg-admin-netral-10 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-li:text-admin-netral-90">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content || ''}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
