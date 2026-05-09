import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { PostStatus } from '../../types/api';

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Data state
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Upload state
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'uploaded' | 'error'>('idle');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaUploadResponse | null>(null);

  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState<{ message: string; type: 'success' | 'error' | 'info' }>({
    message: '',
    type: 'info'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form State
  const [headline, setHeadline] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [pubDateValue, setPubDateValue] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [content, setContent] = useState('');
  const [scheduleDateValue, setScheduleDateValue] = useState('');
  const [currentStatus, setCurrentStatus] = useState<'DRAFT' | 'PUBLISHED' | 'SCHEDULED' | 'DELETED' | 'ARCHIVED'>('DRAFT');


  // Fetch initial data
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const article = await postService.getPostById(parseInt(id));
        setHeadline(article.title);
        setExcerpt(article.excerpt);
        setCurrentStatus(article.status);
        // Ưu tiên ngày xuất bản hoặc ngày hẹn giờ, nếu không có mới dùng ngày tạo
        const displayDate = article.publishedAt || article.scheduledAt || article.createdAt;
        setPubDateValue(formatISODateForDisplay(displayDate));
        setImageCaption(article.thumbnailAlt || '');
        setContent(article.content);
        // If it was scheduled
        // if (article.status === 'SCHEDULED') {
        //   setScheduleDateValue(formatISODateForDisplay(article.publishedAt));
        // }
        
        if (article.thumbnailUrl) {
          setUploadStatus('uploaded');
          // For editing, we don't have the File object, but we have the URL
          setUploadedMedia({
            id: 0, // We don't strictly need the ID for display
            fileUrl: article.thumbnailUrl,
            fileName: 'current-thumbnail',
            fileSize: 0
          });
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

  // ─── Toast helper ───────────────────────────────────────────────────────────
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
      triggerToast(extractErrorMessage(err), 'error', 4000);
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setUploadedMedia(null);
    setUploadStatus('idle');
    setErrors(prev => ({ ...prev, image: '' }));
  };

  // ─── Form validation ──────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!headline.trim()) newErrors.headline = 'Headline is required';
    if (!excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    else if (excerpt.length > 500) newErrors.excerpt = 'Excerpt must be less than 500 characters';
    if (uploadStatus === 'idle') newErrors.image = 'Image cover is required';
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
      case 'caption':
        if (!value.trim() && uploadStatus === 'uploaded') error = 'Image caption is required';
        break;
      case 'content':
        if (!value.trim()) error = 'Content is required';
        break;
      case 'scheduleDate':
        if (!value) error = 'Schedule date is required';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // ─── Build payload ────────────────────────────────────────────────────────────
  const buildPayload = (status: 'PUBLISHED' | 'SCHEDULED' | 'DRAFT') => {
    const pubISO = parseDateStringToISO(pubDateValue);
    const schedISO = parseDateStringToISO(scheduleDateValue);
    const slug = generateSlug(headline);

    const payload: any = {
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

    // Only include media if it's new (has an ID from upload)
    if (uploadedMedia && uploadedMedia.id !== 0) {
      payload['mediaIds'] = [{ mediaId: uploadedMedia.id, sortOrder: 0, role: 'CONTENT' }];
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
    if (!headline.trim()) {
      setErrors(prev => ({ ...prev, headline: 'Headline is required to save' }));
      triggerToast('Please enter a headline before saving.', 'error', 3500);
      return;
    }

    setIsSubmitting(true);
    try {
      // Save keeps the current status (Draft stays Draft, Published stays Published)
      const payload = buildPayload(currentStatus);
      await postService.updatePost(parseInt(id), payload);
      triggerToast(currentStatus === 'DRAFT' ? 'Draft saved successfully!' : 'Changes saved successfully!', 'success');
      setTimeout(() => navigate(ROUTE_PATHS.adminArticles), 2000);
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
      payload.scheduledAt = finalScheduledAt;
    } else {
      delete payload.scheduledAt;
    }

    setIsSubmitting(true);
    try {
      await postService.updatePost(parseInt(id), payload);
      triggerToast(
        status === 'SCHEDULED' ? 'Article scheduled successfully!' : 'The article has been updated and published.',
        'success'
      );
      setTimeout(() => {
        navigate(ROUTE_PATHS.adminArticles);
      }, 2500);
    } catch (err) {
      triggerToast(extractErrorMessage(err), 'error', 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview image URL logic
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
    uploadStatus: (uploadStatus === 'uploaded' ? 'uploaded' : 'idle') as 'idle' | 'uploaded',
    imageUrl: previewImageUrl,
    imageCaption,
    content,
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
      {/* Top Header */}
      <div className="flex items-center justify-between bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-admin-netral-50 hover:text-admin-netral-100 transition-colors">
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

      {/* Main Content */}
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
          type="edit"
          onExpand={() => setIsExpanded(true)}
        />
      </div>

      {/* Expanded Preview */}
      {isExpanded && createPortal(
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

      <Toast 
        message={toastConfig.message}
        type={toastConfig.type}
        isVisible={showToast}
      />
    </div>
  );
};

export default EditArticle;
