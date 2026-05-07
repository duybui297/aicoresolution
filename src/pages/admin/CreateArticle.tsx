import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

const CreateArticle = () => {
  const navigate = useNavigate();

  // Upload state
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

  // Form State
  const [headline, setHeadline] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [pubDateValue, setPubDateValue] = useState(formatISODateForDisplay(new Date()));
  const [imageCaption, setImageCaption] = useState('');
  const [content, setContent] = useState('');
  const [scheduleDateValue, setScheduleDateValue] = useState('');

  // Refs & Portal State
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [showPubDate, setShowPubDate] = useState(false);
  const [pubDatePos, setPubDatePos] = useState({ top: 0, left: 0 });
  const pubDateRef = useRef<HTMLDivElement>(null);
  const [showScheduleDate, setShowScheduleDate] = useState(false);
  const [scheduleDatePos, setScheduleDatePos] = useState({ top: 0, left: 0 });
  const scheduleDateRef = useRef<HTMLDivElement>(null);

  // ─── Toast helper ───────────────────────────────────────────────────────────
  const showToast = (message: string, type: 'success' | 'error' | 'info', autoDismissMs?: number) => {
    setToastConfig({ message, type });
    setShowPublishedToast(true);
    if (autoDismissMs) {
      setTimeout(() => setShowPublishedToast(false), autoDismissMs);
    }
  };

  // ─── Portal position sync ────────────────────────────────────────────────────
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

  // ─── Image handling ──────────────────────────────────────────────────────────
  const handleImageSelect = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image must be less than 10 MB.' }));
      return;
    }

    setImageFile(file);
    setUploadStatus('uploading');
    setErrors(prev => ({ ...prev, image: '' }));

    try {
      const media = await postService.uploadMedia(file, undefined, imageCaption || undefined);
      setUploadedMedia(media);
      setUploadStatus('uploaded');
    } catch (err) {
      setUploadStatus('error');
      setImageFile(null);
      setErrors(prev => ({ ...prev, image: extractErrorMessage(err) }));
      showToast(extractErrorMessage(err), 'error', 4000);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setUploadedMedia(null);
    setUploadStatus('idle');
    setErrors(prev => ({ ...prev, image: '' }));
  };

  // ─── Form validation ──────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!headline.trim()) newErrors.headline = 'Headline is required';
    if (!excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    else if (excerpt.length > 500) newErrors.excerpt = 'Excerpt must be less than 500 characters';
    if (!pubDateValue) newErrors.pubDate = 'Publication date is required';
    if (uploadStatus !== 'uploaded') newErrors.image = 'Image cover is required';
    if (!imageCaption.trim() && uploadStatus === 'uploaded') newErrors.caption = 'Image caption is required';
    if (!content.trim()) newErrors.content = 'Content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name: string, value: any) => {
    let error = '';
    switch (name) {
      case 'headline':
        if (!value.trim()) error = 'Headline is required';
        break;
      case 'excerpt':
        if (!value.trim()) error = 'Excerpt is required';
        else if (value.length > 500) error = 'Excerpt must be less than 500 characters';
        break;
      case 'pubDate':
        if (!value) error = 'Publication date is required';
        break;
      case 'caption':
        if (!value.trim() && uploadStatus === 'uploaded') error = 'Image caption is required';
        break;
      case 'content':
        if (!value.trim()) error = 'Content is required';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // ─── Build payload ────────────────────────────────────────────────────────────
  const buildPayload = (status: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT') => {
    const pubISO = parseDateStringToISO(pubDateValue);
    const schedISO = parseDateStringToISO(scheduleDateValue);
    const slug = generateSlug(headline);

    const payload: Record<string, any> = {
      title: headline.trim(),
      slug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      thumbnailUrl: uploadedMedia?.fileUrl ?? undefined,
      thumbnailAlt: imageCaption.trim() || undefined,
      status,
      contentFormat: 'MARKDOWN',
    };

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
        setIsSubmitting(false);
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
    
    const payload = buildPayload(status) as any;
    if (status === 'SCHEDULED') {
      payload.scheduledAt = finalScheduledAt;
    } else {
      delete payload.scheduledAt;
    }

    setIsSubmitting(true);
    try {
      await postService.createPost(payload);
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

  // ─── Save draft ───────────────────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    if (isSubmitting) return;

    if (!headline.trim()) {
      setErrors(prev => ({ ...prev, headline: 'Headline is required to save a draft' }));
      showToast('Please enter a headline before saving as draft.', 'error', 3500);
      return;
    }

    setIsSubmitting(true);
    try {
      const slug = generateSlug(headline);
      const draftPayload: Record<string, any> = {
        title: headline.trim(),
        slug,
        excerpt: excerpt.trim() || undefined,
        content: content.trim() || undefined,
        thumbnailUrl: uploadedMedia?.fileUrl ?? undefined,
        thumbnailAlt: imageCaption.trim() || undefined,
        status: 'DRAFT',
        contentFormat: 'MARKDOWN',
      };
      if (uploadedMedia) {
        draftPayload['media'] = [{ mediaId: uploadedMedia.id, sortOrder: 0, role: 'CONTENT' }];
      }

      await postService.createPost(draftPayload as any);
      showToast('Draft saved successfully!', 'success', 3000);
      setTimeout(() => navigate(ROUTE_PATHS.adminArticles), 3000);
    } catch (err) {
      showToast(extractErrorMessage(err), 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Preview props ────────────────────────────────────────────────────────────
  const previewUploadStatus: 'idle' | 'uploaded' = uploadStatus === 'uploaded' ? 'uploaded' : 'idle';
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

  const commonPreviewProps = {
    headline,
    excerpt,
    pubDate: pubDateValue,
    uploadStatus: previewUploadStatus,
    imageUrl: previewImageUrl,
    imageCaption,
    content,
    onSaveDraft: handleSaveDraft,
  };

  return (
    <div className="flex flex-col gap-4 h-full relative">
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

      <div className="flex gap-4 items-start pb-10 flex-1 overflow-hidden">
        <ArticleForm
          ref={formContainerRef}
          headline={headline} setHeadline={setHeadline}
          excerpt={excerpt} setExcerpt={setExcerpt}
          pubDateValue={pubDateValue} setPubDateValue={setPubDateValue}
          imageCaption={imageCaption} setImageCaption={setImageCaption}
          content={content} setContent={setContent}
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
        />

        <ArticlePreview
          {...commonPreviewProps}
          mode="side"
          onExpand={() => setIsExpanded(true)}
        />
      </div>

      {isExpanded && createPortal(
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
