import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticlePreview from '../../components/admin/ArticlePreview';
import ArticleForm from '../../components/admin/ArticleForm';
import PublishModal from '../../components/admin/PublishModal';
import Toast from '../../components/admin/Toast';
import { ROUTE_PATHS } from '../../utils/routeConstants';
import postService, {
  parseDateStringToISO,
  generateSlug,
  type MediaUploadResponse,
} from '../../services/postService';
import { extractErrorMessage } from '../../utils/errorHandler';
import { formatISODateForDisplay } from '../../utils/dateUtils';
import { getFullImageUrl } from '../../utils/imageUtils';
import { ArticleStatus } from '../../types/article';
import { type ArticleLanguage } from '../../components/admin/LanguageToggle';
import { useSharedGallery } from '../../hooks/useSharedGallery';

const CreateArticle = () => {
  const navigate = useNavigate();

  const { images: galleryImages, upload: galleryUpload, remove: galleryRemove, isUploading: galleryUploading } = useSharedGallery();

  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'error'>('idle');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaUploadResponse | null>(null);

  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPublishedToast, setShowPublishedToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({
    message: '',
    type: 'info'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Active language ──────────────────────────────────────────────
  const [activeLanguage, setActiveLanguage] = useState<ArticleLanguage>('vi');

  // ── Vietnamese fields ────────────────────────────────────────────
  const [headlineVi, setHeadlineVi] = useState('');
  const [excerptVi, setExcerptVi] = useState('');
  const [imageCaptionVi, setImageCaptionVi] = useState('');
  const [contentVi, setContentVi] = useState('');

  // ── English fields ──────────────────────────────────────────────
  const [headlineEn, setHeadlineEn] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [imageCaptionEn, setImageCaptionEn] = useState('');
  const [contentEn, setContentEn] = useState('');

  // ── Shared / metadata fields ────────────────────────────────────
  const [pubDateValue, setPubDateValue] = useState(formatISODateForDisplay(new Date()));
  const [scheduleDateValue, setScheduleDateValue] = useState('');

  // ── Refs & portal state ─────────────────────────────────────────
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [showPubDate, setShowPubDate] = useState(false);
  const [pubDatePos, setPubDatePos] = useState({ top: 0, left: 0 });
  const pubDateRef = useRef<HTMLDivElement>(null);
  const [showScheduleDate, setShowScheduleDate] = useState(false);
  const [scheduleDatePos, setScheduleDatePos] = useState({ top: 0, left: 0 });
  const scheduleDateRef = useRef<HTMLDivElement>(null);

  // ── Toast helper ────────────────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' | 'info', autoDismissMs?: number) => {
    setToastConfig({ message, type });
    setShowPublishedToast(true);
    if (autoDismissMs) {
      setTimeout(() => setShowPublishedToast(false), autoDismissMs);
    }
  };

  // ── Portal position sync ────────────────────────────────────────
  const updatePositions = useCallback(() => {
    if (pubDateRef.current) {
      const rect = pubDateRef.current.getBoundingClientRect();
      setPubDatePos({ top: rect.bottom + 8, left: rect.left });
    }
    if (scheduleDateRef.current) {
      const rect = scheduleDateRef.current.getBoundingClientRect();
      setScheduleDatePos({ top: rect.top - 378 - 8, left: rect.left });
    }
  }, []);

  useEffect(() => {
    const container = formContainerRef.current;
    if (container) {
      const handleEvent = () => updatePositions();
      container.addEventListener('scroll', handleEvent);
      window.addEventListener('resize', handleEvent);
      return () => {
        container.removeEventListener('scroll', handleEvent);
        window.removeEventListener('resize', handleEvent);
      };
    }
  }, [updatePositions]);

  useEffect(() => {
    if (showPubDate || showScheduleDate) updatePositions();
  }, [showPubDate, showScheduleDate, updatePositions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const portal = document.getElementById('date-picker-portal');
      if (portal && !portal.contains(event.target as Node)) {
        setShowPubDate(false);
        setShowScheduleDate(false);
      }
    };
    if (showPubDate || showScheduleDate) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPubDate, showScheduleDate]);

  // ── Image handling ───────────────────────────────────────────────
  const handleImageSelect = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'Image must be less than 10 MB.' }));
      return;
    }

    setImageFile(file);
    setUploadStatus('uploading');
    setErrors((prev) => ({ ...prev, image: '' }));

    try {
      const media = await postService.uploadMedia(file);
      setUploadedMedia(media);
      setUploadStatus('uploaded');
    } catch (err) {
      setUploadStatus('error');
      setImageFile(null);
      setErrors((prev) => ({ ...prev, image: extractErrorMessage(err) }));
      showToast(extractErrorMessage(err), 'error', 4000);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setUploadedMedia(null);
    setUploadStatus('idle');
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  // ── Determine which language's fields to use for validation ────
  // We validate whichever fields are filled (allow partial)
  const hasViContent = headlineVi.trim() || contentVi.trim();
  const hasEnContent = headlineEn.trim() || contentEn.trim();

  // ── Form validation ─────────────────────────────────────────────
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Always require image
    if (uploadStatus !== 'uploaded') {
      newErrors.image = 'Image cover is required';
    }

    // At least one language must be filled
    if (!hasViContent && !hasEnContent) {
      newErrors.viHeadline = 'At least one language (VI or EN) must have a headline';
      setErrors(newErrors);
      return false;
    }

    // Validate filled language(s)
    if (hasViContent) {
      if (!headlineVi.trim()) newErrors.viHeadline = 'Headline is required';
      if (!excerptVi.trim()) newErrors.viExcerpt = 'Excerpt is required';
      else if (excerptVi.length > 500) newErrors.viExcerpt = 'Excerpt must be less than 500 characters';
      if (!imageCaptionVi.trim() && uploadStatus === 'uploaded') newErrors.viCaption = 'Image caption is required';
      if (!contentVi.trim()) newErrors.viContent = 'Content is required';
    }

    if (hasEnContent) {
      if (!headlineEn.trim()) newErrors.enHeadline = 'Headline is required';
      if (!excerptEn.trim()) newErrors.enExcerpt = 'Excerpt is required';
      else if (excerptEn.length > 500) newErrors.enExcerpt = 'Excerpt must be less than 500 characters';
      if (!imageCaptionEn.trim() && uploadStatus === 'uploaded') newErrors.enCaption = 'Image caption is required';
      if (!contentEn.trim()) newErrors.enContent = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name: string, value: any) => {
    let error = '';
    switch (name) {
      case 'viHeadline':
        if (!value?.trim()) error = 'Headline is required';
        break;
      case 'viExcerpt':
        if (!value?.trim()) error = 'Excerpt is required';
        else if (value.length > 500) error = 'Excerpt must be less than 500 characters';
        break;
      case 'viCaption':
        if (!value?.trim() && uploadStatus === 'uploaded') error = 'Image caption is required';
        break;
      case 'viContent':
        if (!value?.trim()) error = 'Content is required';
        break;
      case 'enHeadline':
        if (!value?.trim()) error = 'Headline is required';
        break;
      case 'enExcerpt':
        if (!value?.trim()) error = 'Excerpt is required';
        else if (value.length > 500) error = 'Excerpt must be less than 500 characters';
        break;
      case 'enCaption':
        if (!value?.trim() && uploadStatus === 'uploaded') error = 'Image caption is required';
        break;
      case 'enContent':
        if (!value?.trim()) error = 'Content is required';
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ── Build payload ───────────────────────────────────────────────
  const buildPayload = (status: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT') => {
    const pubISO = parseDateStringToISO(pubDateValue);
    const schedISO = parseDateStringToISO(scheduleDateValue);

    // Use the VI headline to generate the base slug
    const baseHeadline = headlineVi.trim() || headlineEn.trim();
    const slug = generateSlug(baseHeadline);

    const payload: Record<string, unknown> = {
      status,
      contentFormat: 'MARKDOWN',
    };

    // Only include VI fields if filled
    if (hasViContent) {
      Object.assign(payload, {
        title: headlineVi.trim(),
        excerpt: excerptVi.trim(),
        content: contentVi.trim(),
        thumbnailAlt: imageCaptionVi.trim() || undefined,
      });
    }

    // Only include EN fields if filled
    if (hasEnContent) {
      Object.assign(payload, {
        titleEn: headlineEn.trim(),
        excerptEn: excerptEn.trim(),
        contentEn: contentEn.trim(),
        thumbnailAltEn: imageCaptionEn.trim() || undefined,
      });
    }

    if (pubISO) payload['publishedAt'] = pubISO;
    if (schedISO) payload['scheduledAt'] = schedISO;

    if (uploadedMedia) {
      payload['media'] = [{ mediaId: uploadedMedia.id, sortOrder: 0, role: 'CONTENT' }];
    }

    return payload;
  };

  // ─── Publish ──────────────────────────────────────────────────────────────────
  const handlePublish = () => {
    if (validateForm()) {
      setIsPublishModalOpen(true);
    } else {
      showToast('Please fill in all required fields correctly.', 'error', 3500);
    }
  };

  const confirmPublish = async () => {
    setIsPublishModalOpen(false);
    if (isSubmitting) return;

    const now = new Date();
    const pubISO = parseDateStringToISO(pubDateValue);
    const schedISO = parseDateStringToISO(scheduleDateValue);

    let status: 'PUBLISHED' | 'SCHEDULED' = 'PUBLISHED';
    let finalScheduledAt: string | undefined = undefined;

    if (schedISO) {
      const sDate = new Date(schedISO);
      if (sDate <= now) {
        showToast('Schedule date must be in the future.', 'error', 4000);
        return;
      }
      status = 'SCHEDULED';
      finalScheduledAt = schedISO;
    } else if (pubISO) {
      const pDate = new Date(pubISO);
      if (pDate > now) {
        status = 'SCHEDULED';
        finalScheduledAt = pubISO;
      } else {
        status = 'PUBLISHED';
      }
    }

    const payload = buildPayload(status) as Record<string, unknown>;
    if (status === 'SCHEDULED') {
      payload['scheduledAt'] = finalScheduledAt;
    } else {
      delete payload['scheduledAt'];
    }

    setIsSubmitting(true);
    try {
      await postService.createPost(payload as Parameters<typeof postService.createPost>[0]);
      showToast(
        status === 'SCHEDULED' ? 'Article scheduled successfully!' : 'The article has been published.',
        'success'
      );
      setTimeout(() => {
        setShowPublishedToast(false);
        navigate(ROUTE_PATHS.adminArticles);
      }, 2500);
    } catch (err) {
      showToast(extractErrorMessage(err), 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Save draft ─────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    if (isSubmitting) return;

    const baseHeadline = headlineVi.trim() || headlineEn.trim();
    if (!baseHeadline) {
      showToast('Please enter a headline before saving as draft.', 'error', 3500);
      return;
    }

    setIsSubmitting(true);
    try {
      const slug = generateSlug(baseHeadline);
      const draftPayload: Record<string, unknown> = {
        slug,
        status: 'DRAFT',
        contentFormat: 'MARKDOWN',
      };

      if (hasViContent) {
        Object.assign(draftPayload, {
          title: headlineVi.trim(),
          excerpt: excerptVi.trim() || undefined,
          content: contentVi.trim() || undefined,
          thumbnailAlt: imageCaptionVi.trim() || undefined,
        });
      }

      if (hasEnContent) {
        Object.assign(draftPayload, {
          titleEn: headlineEn.trim(),
          excerptEn: excerptEn.trim() || undefined,
          contentEn: contentEn.trim() || undefined,
          thumbnailAltEn: imageCaptionEn.trim() || undefined,
        });
      }

      if (uploadedMedia) {
        draftPayload['media'] = [{ mediaId: uploadedMedia.id, sortOrder: 0, role: 'CONTENT' }];
      }

      await postService.createPost(draftPayload as Parameters<typeof postService.createPost>[0]);
      showToast('Draft saved successfully!', 'success', 3000);
      setTimeout(() => navigate(ROUTE_PATHS.adminArticles), 3000);
    } catch (err) {
      showToast(extractErrorMessage(err), 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Preview image URL logic ───────────────────────────────────────
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!imageFile) {
      setPreviewImageUrl(getFullImageUrl(uploadedMedia?.fileUrl));
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewImageUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile, uploadedMedia]);

  // ── Active caption based on language ──────────────────────────────
  const activeCaption = activeLanguage === 'vi' ? imageCaptionVi : imageCaptionEn;

  // ── Common preview props ─────────────────────────────────────────
  const commonPreviewProps = {
    headlineVi,
    headlineEn,
    excerptVi,
    excerptEn,
    contentVi,
    contentEn,
    captionVi: imageCaptionVi,
    captionEn: imageCaptionEn,
    activeLanguage,
    pubDate: pubDateValue,
    uploadStatus: uploadStatus === 'uploaded' ? 'uploaded' : 'idle',
    imageUrl: previewImageUrl,
    articleStatus: 'Draft' as ArticleStatus,
    onSaveDraft: handleSaveDraft,
  };

  return (
    <div className="flex flex-col gap-4 h-full relative">
      {/* ── Top header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
            className="text-admin-netral-50 hover:text-admin-netral-100 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-admin-xl font-admin-semibold flex items-center">
            <button
              onClick={() => navigate(ROUTE_PATHS.adminArticles)}
              className="text-admin-netral-50 hover:text-admin-primary-100 transition-colors"
            >
              Articles
            </button>
            <span className="text-admin-netral-50 mx-2">/</span>
            <span className="text-admin-netral-100">Add new article</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleSaveDraft}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full text-admin-xs font-admin-medium border border-admin-netral-30 text-admin-netral-100 bg-admin-netral-10 hover:bg-admin-netral-20 transition-colors shrink-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            Save to draft
          </button>
          <button
            onClick={handlePublish}
            disabled={isSubmitting || uploadStatus === 'uploading'}
            className="bg-admin-primary-100 text-admin-netral-10 px-6 py-2.5 rounded-full text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors shrink-0 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            Publish
          </button>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="flex gap-4 items-start pb-10 flex-1 overflow-hidden">
        <ArticleForm
          ref={formContainerRef}
          activeLanguage={activeLanguage}
          setActiveLanguage={setActiveLanguage}
          headlineVi={headlineVi} setHeadlineVi={setHeadlineVi}
          excerptVi={excerptVi} setExcerptVi={setExcerptVi}
          imageCaptionVi={imageCaptionVi} setImageCaptionVi={setImageCaptionVi}
          contentVi={contentVi} setContentVi={setContentVi}
          headlineEn={headlineEn} setHeadlineEn={setHeadlineEn}
          excerptEn={excerptEn} setExcerptEn={setExcerptEn}
          imageCaptionEn={imageCaptionEn} setImageCaptionEn={setImageCaptionEn}
          contentEn={contentEn} setContentEn={setContentEn}
          pubDateValue={pubDateValue} setPubDateValue={setPubDateValue}
          scheduleDateValue={scheduleDateValue} setScheduleDateValue={setScheduleDateValue}
          uploadStatus={uploadStatus}
          imageFile={imageFile}
          onImageSelect={handleImageSelect}
          onImageRemove={handleImageRemove}
          previewImageUrl={previewImageUrl}
          showPubDate={showPubDate} setShowPubDate={setShowPubDate} pubDatePos={pubDatePos}
          showScheduleDate={showScheduleDate} setShowScheduleDate={setShowScheduleDate} scheduleDatePos={scheduleDatePos}
          pubDateRef={pubDateRef} scheduleDateRef={scheduleDateRef}
          errors={errors}
          validateField={validateField}
          galleryImages={galleryImages}
          onGalleryUpload={galleryUpload}
          onGalleryDelete={galleryRemove}
        />

        <ArticlePreview
          {...commonPreviewProps}
          mode="side"
          onExpand={() => setIsExpanded(true)}
        />
      </div>

      {/* ── Expanded preview ──────────────────────────────────── */}
      {isExpanded &&
        createPortal(
          <ArticlePreview
            {...commonPreviewProps}
            mode="expanded"
            onClose={() => setIsExpanded(false)}
            onNavigateBack={() => navigate(ROUTE_PATHS.adminArticles)}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />,
          document.body
        )}

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={confirmPublish}
      />

      <Toast
        message={toastConfig.message}
        type={toastConfig.type}
        actionText={toastConfig.type === 'success' ? 'View articles' : undefined}
        isVisible={showPublishedToast}
        onAction={() => navigate(ROUTE_PATHS.admin)}
      />
    </div>
  );
};

export default CreateArticle;
