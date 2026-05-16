import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArticlePreview from '../../components/admin/ArticlePreview';
import ArticleForm from '../../components/admin/ArticleForm';
import PublishModal from '../../components/admin/PublishModal';
import UnpublishModal from '../../components/admin/UnpublishModal';
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
import { PostStatus } from '../../types/api';
import { type ArticleLanguage } from '../../components/admin/LanguageToggle';
import { useSharedGallery, type GalleryImage } from '../../hooks/useSharedGallery';

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // ── Shared content gallery (persisted in localStorage) ────────────
  const { images: galleryImages, upload: galleryUpload, remove: galleryRemove, seed: gallerySeed } = useSharedGallery();

  // ── Data state ────────────────────────────────────────────────────
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Upload state ───────────────────────────────────────────────────
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'error'>('idle');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaUploadResponse | null>(null);

  // ── UI state ─────────────────────────────────────────────────────
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({
    message: '',
    type: 'info'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStatus, setCurrentStatus] = useState<PostStatus>('DRAFT');
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);

  // ── Active language ────────────────────────────────────────────────
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
  const [pubDateValue, setPubDateValue] = useState('');
  const [scheduleDateValue, setScheduleDateValue] = useState('');

  // ── Fetch initial data ──────────────────────────────────────────
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const article = await postService.getPostById(parseInt(id));
        setHeadlineVi(article.title || '');
        setExcerptVi(article.excerpt || '');
        setImageCaptionVi(article.thumbnailAlt || '');
        setContentVi(article.content || '');

        setHeadlineEn(article.titleEn || '');
        setExcerptEn(article.excerptEn || '');
        setImageCaptionEn(article.thumbnailAltEn || '');
        setContentEn(article.contentEn || '');

        setCurrentStatus(article.status as PostStatus);
        const displayDate = article.publishedAt || article.scheduledAt || article.createdAt;
        setPubDateValue(formatISODateForDisplay(displayDate));

        if (article.thumbnailUrl) {
          setUploadStatus('uploaded');
          setUploadedMedia({
            id: 0,
            fileUrl: article.thumbnailUrl,
            fileName: 'current-thumbnail',
            fileSize: 0
          });
        }

        if (article.media && article.media.length > 0) {
          const contentMedia: GalleryImage[] = article.media
            .filter((m) => m.role !== 'THUMBNAIL')
            .map((m) => ({
              id: m.mediaId,
              fileUrl: getFullImageUrl(m.fileUrl),
              fileName: m.fileName || `image-${m.mediaId}`,
              fileSize: m.fileSize || 0,
            }));
          gallerySeed(contentMedia);
        }
      } catch (err) {
        setToastConfig({ message: extractErrorMessage(err), type: 'error' });
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // ─── Toast helper ──────────────────────────────────────────────────
  const triggerToast = (message: string, type: 'success' | 'error' | 'info', autoDismissMs: number = 3000) => {
    setToastConfig({ message, type });
    setShowToast(true);
    if (autoDismissMs) {
      setTimeout(() => setShowToast(false), autoDismissMs);
    }
  };

  // Refs & Portal State
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [showPubDate, setShowPubDate] = useState(false);
  const [pubDatePos, setPubDatePos] = useState({ top: 0, left: 0 });
  const pubDateRef = useRef<HTMLDivElement>(null);
  const [showScheduleDate, setShowScheduleDate] = useState(false);
  const [scheduleDatePos, setScheduleDatePos] = useState({ top: 0, left: 0 });
  const scheduleDateRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (showPubDate || showScheduleDate) updatePositions();
  }, [showPubDate, showScheduleDate, updatePositions]);

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
      triggerToast(extractErrorMessage(err), 'error', 4000);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setUploadedMedia(null);
    setUploadStatus('idle');
    setErrors((prev) => ({ ...prev, image: '' }));
  };

  // ── Content helpers ──────────────────────────────────────────────
  const hasViContent = headlineVi.trim() || contentVi.trim();
  const hasEnContent = headlineEn.trim() || contentEn.trim();

  // ── Form validation ─────────────────────────────────────────────
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (uploadStatus === 'idle') newErrors.image = 'Image cover is required';

    if (!hasViContent && !hasEnContent) {
      newErrors.viHeadline = 'At least one language (VI or EN) must have a headline';
      setErrors(newErrors);
      return false;
    }

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

    const baseHeadline = headlineVi.trim() || headlineEn.trim();
    const slug = generateSlug(baseHeadline);

    const payload: Record<string, unknown> = {
      slug,
      status,
      contentFormat: 'MARKDOWN',
    };

    if (hasViContent) {
      Object.assign(payload, {
        title: headlineVi.trim(),
        excerpt: excerptVi.trim(),
        content: contentVi.trim(),
        thumbnailAlt: imageCaptionVi.trim() || undefined,
      });
    }

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

    // Only include media if it's new (has a non-zero ID from upload)
    if (uploadedMedia && uploadedMedia.id !== 0) {
      payload['media'] = [{ mediaId: uploadedMedia.id, sortOrder: 0, role: 'CONTENT' }];
    }

    return payload;
  };

  const handleAction = (type: 'save' | 'publish') => {
    if (type === 'save') {
      handleSave();
    } else {
      if (validateForm()) {
        setIsPublishModalOpen(true);
      } else {
        triggerToast('Please fill in all required fields correctly.', 'error', 3500);
      }
    }
  };

  const handleSave = async () => {
    if (isSubmitting || !id) return;
    if (!headlineVi.trim() && !headlineEn.trim()) {
      setErrors((prev) => ({ ...prev, viHeadline: 'At least one language must have a headline' }));
      triggerToast('Please enter a headline before saving.', 'error', 3500);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = buildPayload(currentStatus);
      await postService.updatePost(parseInt(id), payload as Parameters<typeof postService.updatePost>[1]);
      triggerToast(currentStatus === 'DRAFT' ? 'Draft saved successfully!' : 'Changes saved successfully!', 'success');
    } catch (err) {
      triggerToast(extractErrorMessage(err), 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmPublish = async () => {
    setIsPublishModalOpen(false);
    if (isSubmitting || !id) return;

    const now = new Date();
    const pubISO = parseDateStringToISO(pubDateValue);
    const schedISO = parseDateStringToISO(scheduleDateValue);

    let status: 'PUBLISHED' | 'SCHEDULED' = 'PUBLISHED';
    let finalScheduledAt: string | undefined = undefined;

    if (schedISO) {
      const sDate = new Date(schedISO);
      if (sDate <= now) {
        triggerToast('Schedule date must be in the future.', 'error', 4000);
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

    const payload = buildPayload(status);
    if (status === 'SCHEDULED') {
      payload['scheduledAt'] = finalScheduledAt;
    } else {
      delete payload['scheduledAt'];
    }

    setIsSubmitting(true);
    try {
      await postService.updatePost(parseInt(id), payload as Parameters<typeof postService.updatePost>[1]);
      setCurrentStatus(status);
      triggerToast(
        status === 'SCHEDULED' ? 'Article scheduled successfully!' : 'The article has been updated and published.',
        'success'
      );
    } catch (err) {
      triggerToast(extractErrorMessage(err), 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnpublish = () => {
    setIsUnpublishModalOpen(true);
  };

  const confirmUnpublish = async () => {
    if (!id) return;
    setIsUnpublishing(true);
    try {
      await postService.unpublishPost(parseInt(id));
      setCurrentStatus('ARCHIVED');
      setIsUnpublishModalOpen(false);
      triggerToast('Article unpublished successfully', 'success');
    } catch (err) {
      triggerToast(extractErrorMessage(err) || 'Failed to unpublish article', 'error', 5000);
    } finally {
      setIsUnpublishing(false);
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

  // ── Status mapping ────────────────────────────────────────────────
  const mapPostStatusToArticleStatus = (status: PostStatus): ArticleStatus => {
    switch (status) {
      case 'PUBLISHED': return 'Published';
      case 'DRAFT': return 'Draft';
      case 'SCHEDULED': return 'Scheduled';
      case 'DELETED': return 'Deleted';
      case 'ARCHIVED': return 'Archived';
      case 'PENDING': return 'Waiting for approval';
      case 'APPROVED': return 'Approved';
      case 'REJECTED': return 'Rejected';
      default: return 'Unknown';
    }
  };

  // ── Common preview props ──────────────────────────────────────────
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
    articleStatus: mapPostStatusToArticleStatus(currentStatus),
    onUnpublish: handleUnpublish,
    onSaveDraft: () => handleAction('save'),
    saveLabel: `Save ${currentStatus === 'DRAFT' ? 'to draft' : 'changes'}`
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-10 h-10 text-admin-primary-100 animate-spin" />
          <span className="text-admin-base text-admin-netral-60 font-admin-medium">Loading article details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full relative">
      {/* ── Top header ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-admin-netral-50 hover:text-admin-netral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-admin-xl font-admin-semibold">
            <button
              onClick={() => navigate(ROUTE_PATHS.adminArticles)}
              className="text-admin-netral-50 hover:text-admin-primary-100 transition-colors"
            >
              Articles
            </button>
            <span className="text-admin-netral-50 mx-2">/</span>
            <span className="text-admin-netral-100">Edit article</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleAction('save')}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full text-admin-xs font-admin-medium border border-admin-netral-30 text-admin-netral-100 bg-admin-netral-10 hover:bg-admin-netral-20 transition-colors shrink-0 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Save {currentStatus === 'DRAFT' ? 'to draft' : 'changes'}
          </button>
          <button
            onClick={() => handleAction('publish')}
            disabled={isSubmitting || uploadStatus === 'uploading'}
            className="bg-admin-primary-100 text-admin-netral-10 px-6 py-2.5 rounded-full text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors shrink-0 disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
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
          type="edit"
          onExpand={() => setIsExpanded(true)}
        />
      </div>

      {/* ── Expanded preview ──────────────────────────────────── */}
      {isExpanded &&
        createPortal(
          <ArticlePreview
            {...commonPreviewProps}
            mode="expanded"
            type="edit"
            onClose={() => setIsExpanded(false)}
            onNavigateBack={() => navigate(ROUTE_PATHS.adminArticles)}
            onPublish={() => handleAction('publish')}
            onSaveDraft={() => handleAction('save')}
          />,
          document.body
        )}

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={confirmPublish}
      />

      <UnpublishModal
        isOpen={isUnpublishModalOpen}
        isLoading={isUnpublishing}
        onClose={() => setIsUnpublishModalOpen(false)}
        onConfirm={confirmUnpublish}
        title="Unpublish Article"
        message="This article will be removed from public view and moved to Archived. You can republish it anytime."
      />

      <Toast
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={showToast}
      />
    </div>
  );
};

export default EditArticle;
