import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ArticlePreview from '../../components/admin/ArticlePreview';
import ArticleForm from '../../components/admin/ArticleForm';
import PublishModal from '../../components/admin/PublishModal';
import Toast from '../../components/admin/Toast';

import { ROUTE_PATHS } from '../../utils/routeConstants';
import { mockArticles } from '../../data/mockArticles';

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploaded'>('idle');
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

  // Find and map data
  useEffect(() => {
    if (id) {
      const article = mockArticles.find(a => a.id === parseInt(id));
      if (article) {
        setHeadline(article.headline);
        // Since mockArticles doesn't have all fields, we mock the rest for demonstration
        setExcerpt("Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a mocked excerpt for the edit demonstration.");
        setPubDateValue("27/01/2025 - 10:00 AM");
        setImageCaption("This is a mocked image caption.");
        setContent("<h1>This is mocked content</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>");
        setScheduleDateValue("28/01/2025 - 11:00 AM");
        setUploadStatus('uploaded');
      }
    }
  }, [id]);

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
    if (showPubDate || showScheduleDate) updatePositions();
  }, [showPubDate, showScheduleDate, updatePositions]);

  const handleUploadMock = () => setUploadStatus('uploaded');
  const handleRemoveImageMock = () => setUploadStatus('idle');

  const commonPreviewProps = {
    headline,
    pubDate: pubDateValue,
    uploadStatus,
    imageCaption,
    content,
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!headline.trim()) newErrors.headline = 'Headline is required';
    if (!excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!pubDateValue) newErrors.pubDate = 'Publication date is required';
    if (uploadStatus === 'idle') newErrors.image = 'Image cover is required';
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
        else if (value.length > 150) error = 'Excerpt must be less than 150 characters';
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
      case 'scheduleDate':
        if (!value) error = 'Schedule date is required';
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleAction = (type: 'save' | 'publish') => {
    if (validateForm()) {
      if (type === 'publish') {
        setIsPublishModalOpen(true);
      } else {
        setToastConfig({ message: 'Changes saved successfully.', type: 'success' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } else {
      setToastConfig({ message: 'Please fill in all required fields.', type: 'error' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const confirmPublish = () => {
    setIsPublishModalOpen(false);
    setToastConfig({ message: 'The article has been updated and published.', type: 'success' });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate(ROUTE_PATHS.admin);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4 h-full relative">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-admin-netral-50 hover:text-admin-netral-100 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-admin-xl font-admin-semibold">
            <span className="text-admin-netral-50">Articles / </span>
            <span className="text-admin-netral-100">Edit article</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleAction('save')}
            className="px-6 py-2.5 rounded-full text-admin-xs font-admin-medium border border-admin-netral-30 text-admin-netral-100 bg-admin-netral-10 hover:bg-admin-netral-20 transition-colors shrink-0"
          >
            Save changes
          </button>
          <button 
            onClick={() => handleAction('publish')}
            className="bg-admin-primary-100 text-admin-netral-10 px-6 py-2.5 rounded-full text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors shrink-0"
          >
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
          handleUploadMock={handleUploadMock}
          handleRemoveImageMock={handleRemoveImageMock}
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
          onNavigateBack={() => navigate(ROUTE_PATHS.admin)}
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
