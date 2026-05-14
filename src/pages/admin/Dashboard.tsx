import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Bell, SlidersHorizontal, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { ArticleTable } from '../../components/admin/ArticleTable';
import Pagination from '../../components/admin/Pagination';
import FilterModal from '../../components/admin/FilterModal';
import ArticlePreview from '../../components/admin/ArticlePreview';
import Toast from '../../components/admin/Toast';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import UnpublishModal from '../../components/admin/UnpublishModal';
import postService from '../../services/postService';
import { Article } from '../../types/article';
import { PostResponse } from '../../types/api';
import { ROUTE_PATHS } from '../../utils/routeConstants';
import { formatISODateForDisplay } from '../../utils/dateUtils';

const Dashboard = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize from URL
  const initialPage = Number(searchParams.get('page')) || 1;
  const initialSearch = searchParams.get('search') || '';
  const initialStatuses = useMemo(() => {
    const s = searchParams.get('status');
    return s ? s.split(',') : [];
  }, [searchParams]);
  const initialRole = searchParams.get('role') || 'All';
  const initialDateRange = searchParams.get('dateRange') || '';
  const initialDateStr = searchParams.get('date');
  const initialDate = initialDateStr ? new Date(initialDateStr) : null;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Article; direction: 'asc' | 'desc' } | null>({ key: 'dateCreated', direction: 'desc' });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<PostResponse | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    isVisible: false,
    message: '',
    type: 'info'
  });
  
  // Delete Modal state
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    ids: number[];
    type: 'single' | 'batch';
    isDeleting: boolean;
  }>({
    isOpen: false,
    ids: [],
    type: 'single',
    isDeleting: false
  });

  // Unpublish Modal state
  const [unpublishModal, setUnpublishModal] = useState<{
    isOpen: boolean;
    id: number | null;
    isLoading: boolean;
  }>({
    isOpen: false,
    id: null,
    isLoading: false
  });

  // New Selection state
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const [filters, setFilters] = useState<{
    statuses: string[];
    searchQuery: string;
    dateRange: string;
    specificDate: Date | null;
    role: string;
  }>({
    statuses: initialStatuses,
    searchQuery: initialSearch,
    dateRange: initialDateRange,
    specificDate: initialDate,
    role: initialRole
  });

  // Sync state with URL when filters or page changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set('page', currentPage.toString());
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    if (filters.statuses.length > 0) params.set('status', filters.statuses.join(','));
    if (filters.role !== 'All') params.set('role', filters.role);
    if (filters.dateRange) params.set('dateRange', filters.dateRange);
    if (filters.specificDate) params.set('date', filters.specificDate.toISOString());

    // Only update if params actually changed to avoid unnecessary re-renders
    const newParamsStr = params.toString();
    if (newParamsStr !== searchParams.toString()) {
      setSearchParams(params, { replace: true });
    }
  }, [currentPage, filters, setSearchParams, searchParams]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const statuses = status ? status.split(',') : [];
    const role = searchParams.get('role') || 'All';
    const dateRange = searchParams.get('dateRange') || '';
    const dateStr = searchParams.get('date');
    const date = dateStr ? new Date(dateStr) : null;

    if (page !== currentPage) setCurrentPage(page);
    
    // Deep comparison for filters to avoid infinite loops
    const hasFilterChanges = 
      filters.searchQuery !== search ||
      filters.role !== role ||
      filters.dateRange !== dateRange ||
      JSON.stringify(filters.statuses) !== JSON.stringify(statuses) ||
      (filters.specificDate?.getTime() !== date?.getTime());

    if (hasFilterChanges) {
      setFilters({
        searchQuery: search,
        statuses,
        role,
        dateRange,
        specificDate: date
      });
    }
  }, [searchParams]);

  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const itemsPerPage = 10;

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.searchQuery), 500);
    return () => clearTimeout(timer);
  }, [filters.searchQuery]);

  const showToast = (message: string, type: 'success' | 'error' | 'info', autoDismissMs = 3500) => {
    setToast({ isVisible: true, message, type });
    if (autoDismissMs) {
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), autoDismissMs);
    }
  };

  const handleViewArticle = async (id: number) => {
    setIsPreviewLoading(true);
    try {
      const fullArticle = await postService.getPostById(id);
      setPreviewArticle(fullArticle);
    } catch (error: any) {
      console.error('Failed to fetch article details for preview:', error);
      const { extractErrorMessage } = await import('../../utils/errorHandler');
      showToast(extractErrorMessage(error), 'error');
    } finally {
      setIsPreviewLoading(false);
    }
  };

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      let sortParam = '';
      if (sortConfig) {
        const mapping: Record<string, string> = {
          publisher: 'authorId',
          headline: 'title',
          status: 'status',
          dateCreated: 'createdAt'
        };
        const backendKey = mapping[sortConfig.key as string] || sortConfig.key;
        sortParam = `${backendKey},${sortConfig.direction}`;
      }

      // Prepare statuses mapping
      const statusMapping: Record<string, string> = {
        'Published': 'PUBLISHED',
        'Scheduled': 'SCHEDULED',
        'Draft': 'DRAFT',
        'Waiting for approval': 'PENDING',
        'Approved': 'APPROVED',
        'Rejected': 'REJECTED',
        'Archived': 'ARCHIVED'
      };

      const mappedStatuses = filters.statuses.map(s => statusMapping[s] || s.toUpperCase());

      // Calculate startDate from dateRange or specificDate
      let startDateStr: string | undefined = undefined;
      if (filters.specificDate) {
        startDateStr = filters.specificDate.toISOString();
      } else if (filters.dateRange) {
        const now = new Date();
        const days = parseInt(filters.dateRange.split(' ')[0]);
        if (!isNaN(days)) {
          const pastDate = new Date(now.setDate(now.getDate() - days));
          startDateStr = pastDate.toISOString();
        }
      }

      const response = await postService.getPosts(
        currentPage - 1, 
        itemsPerPage, 
        mappedStatuses.length > 0 ? mappedStatuses : undefined,
        sortParam,
        debouncedSearch || undefined,
        startDateStr,
        undefined, // endDate
        filters.role === 'All' ? undefined : filters.role
      );
      
      const mappedArticles: Article[] = response.content.map((p): Article => ({
        id: p.id,
        publisher: p.authorName || 'Super Admin',
        headline: p.title,
        status: (p.status as string) === 'PUBLISHED' ? 'Published' : 
                (p.status as string) === 'DRAFT' ? 'Draft' : 
                (p.status as string) === 'DELETED' ? 'Deleted' : 
                (p.status as string) === 'SCHEDULED' ? 'Scheduled' : 
                (p.status as string) === 'PENDING' ? 'Waiting for approval' : 
                (p.status as string) === 'APPROVED' ? 'Approved' :
                (p.status as string) === 'REJECTED' ? 'Rejected' :
                (p.status as string) === 'ARCHIVED' ? 'Archived' : 'Unknown',
        role: 'Admin',
        dateCreated: formatISODateForDisplay(p.publishedAt || p.scheduledAt || p.createdAt),
        rawDate: p.createdAt
      }));

      setArticles(mappedArticles);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      console.error('Failed to fetch articles:', error);
      const { extractErrorMessage } = await import('../../utils/errorHandler');
      showToast(extractErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters, sortConfig, debouncedSearch]);

  const handleDelete = (id: number) => {
    setDeleteModal({
      isOpen: true,
      ids: [id],
      type: 'single',
      isDeleting: false
    });
  };

  const handleDeleteBatch = (ids: number[]) => {
    setDeleteModal({
      isOpen: true,
      ids,
      type: 'batch',
      isDeleting: false
    });
  };

  const handleUnpublish = (id: number) => {
    setUnpublishModal({ isOpen: true, id, isLoading: false });
  };

  const confirmUnpublish = async () => {
    if (!unpublishModal.id) return;
    setUnpublishModal(prev => ({ ...prev, isLoading: true }));
    try {
      await postService.unpublishPost(unpublishModal.id);
      showToast(t('admin.article.unpublishSuccess'), 'success');
      setUnpublishModal({ isOpen: false, id: null, isLoading: false });
      fetchArticles();
    } catch (error: any) {
      console.error('Unpublish failed:', error);
      const { extractErrorMessage } = await import('../../utils/errorHandler');
      showToast(extractErrorMessage(error) || t('admin.article.unpublishFailed'), 'error');
      setUnpublishModal(prev => ({ ...prev, isLoading: false }));
    }
  };

  const confirmDelete = async () => {
    setDeleteModal(prev => ({ ...prev, isDeleting: true }));
    try {
      if (deleteModal.type === 'single') {
        await postService.deletePost(deleteModal.ids[0]);
      } else {
        await postService.deletePostsBatch(deleteModal.ids);
      }
      
      showToast(
        deleteModal.type === 'single' ? 'Article deleted successfully' : `Successfully deleted ${deleteModal.ids.length} articles`, 
        'success'
      );
      setDeleteModal({ isOpen: false, ids: [], type: 'single', isDeleting: false });
      setSelectedIds(new Set()); // Clear selection after delete
      fetchArticles();
    } catch (error: any) {
      console.error('Delete failed:', error);
      const { extractErrorMessage } = await import('../../utils/errorHandler');
      showToast(extractErrorMessage(error), 'error');
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleTabChange = (tab: string) => {
    setFilters(prev => ({
      ...prev,
      statuses: tab === 'All' ? [] : [tab]
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (config: { key: keyof Article; direction: 'asc' | 'desc' } | null) => {
    setSortConfig(config);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0">
        <h1 className="text-admin-xl font-admin-semibold text-admin-primary-100">Articles</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center border border-admin-netral-30 rounded-full px-4 py-2.5 bg-admin-netral-10 min-w-[320px]">
            <Search className="w-4 h-4 text-admin-netral-60 mr-3" />
            <input
              type="text"
              placeholder="Search somethings"
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="flex-1 outline-none bg-transparent text-admin-netral-60 placeholder:text-admin-netral-60 text-admin-xs font-admin-regular"
            />
            <SlidersHorizontal
              onClick={() => setIsFilterModalOpen(true)}
              className="w-4 h-4 text-admin-netral-60 ml-3 cursor-pointer hover:text-admin-netral-80 transition-colors"
            />
          </div>

          <button className="w-11 h-11 flex items-center justify-center border border-admin-netral-30 rounded-full text-admin-netral-60 hover:bg-admin-netral-20 transition-colors shrink-0">
            <Bell className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate(ROUTE_PATHS.adminCreateArticle)}
            className="bg-admin-primary-100 text-admin-netral-10 px-6 py-2.5 rounded-full text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors shrink-0"
          >
            Add new article
          </button>
          
          {selectedIds.size > 0 && (
            <button
              onClick={() => handleDeleteBatch(Array.from(selectedIds))}
              className="bg-admin-warning-10 text-admin-warning-100 border border-admin-warning-100/20 px-6 py-2.5 rounded-full text-admin-xs font-admin-medium hover:bg-admin-warning-20 transition-colors shrink-0 flex items-center gap-2 animate-in fade-in slide-in-from-right-4"
            >
              Delete {selectedIds.size} articles
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0 overflow-x-auto">
        {['All', 'Published', 'Scheduled', 'Draft', 'Archived'].map((tab) => {
          const isActive = tab === 'All' 
            ? filters.statuses.length === 0 
            : filters.statuses.length === 1 && filters.statuses[0] === tab;
            
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-8 py-2.5 rounded-full text-admin-xs font-admin-medium transition-colors shrink-0 ${isActive
                  ? 'bg-admin-primary-100 text-admin-netral-10'
                  : 'bg-admin-netral-10 text-admin-netral-100 border border-admin-netral-30 hover:bg-admin-netral-20'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center bg-admin-netral-10 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 text-admin-primary-100 animate-spin" />
            <span className="text-admin-xs text-admin-netral-60 font-admin-medium">Loading articles...</span>
          </div>
        </div>
      ) : (
        <ArticleTable 
          articles={articles} 
          sortConfig={sortConfig}
          onSort={handleSortChange}
          onView={handleViewArticle}
          onDelete={handleDelete}
          onUnpublish={handleUnpublish}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={deleteModal.isOpen}
        isLoading={deleteModal.isDeleting}
        onClose={() => !deleteModal.isDeleting && setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmDelete}
        title={deleteModal.type === 'single' ? 'Delete Article' : `Delete ${deleteModal.ids.length} Articles`}
        message={
          deleteModal.type === 'single' 
            ? 'Are you sure you want to delete this article? This action cannot be undone.'
            : `Are you sure you want to delete ${deleteModal.ids.length} selected articles? This action cannot be undone.`
        }
      />

      {/* Unpublish Confirmation Modal */}
      <UnpublishModal
        isOpen={unpublishModal.isOpen}
        isLoading={unpublishModal.isLoading}
        onClose={() => !unpublishModal.isLoading && setUnpublishModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={confirmUnpublish}
        title={t('admin.article.unpublishTitle')}
        message={t('admin.article.unpublishMessage')}
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Quick Preview Modal */}
      {previewArticle && createPortal(
        <ArticlePreview
          headline={previewArticle.title}
          excerpt={previewArticle.excerpt}
          pubDate={formatISODateForDisplay(previewArticle.publishedAt || previewArticle.scheduledAt || previewArticle.createdAt)}
          uploadStatus="uploaded"
          imageUrl={previewArticle.thumbnailUrl}
          imageCaption={previewArticle.thumbnailAlt || ''}
          content={previewArticle.content}
          mode="expanded"
          type="edit"
          onClose={() => setPreviewArticle(null)}
          onNavigateBack={() => setPreviewArticle(null)}
          onBackToForm={() => {
            if (previewArticle) {
              navigate(ROUTE_PATHS.adminEditArticle.replace(':id', previewArticle.id.toString()));
            }
          }}
        />,
        document.body
      )}

      {/* Global Loading for Preview Fetch */}
      {isPreviewLoading && (
        <div className="fixed inset-0 bg-black/20 z-[300] flex items-center justify-center backdrop-blur-[2px]">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-admin-primary-100 animate-spin" />
            <p className="text-admin-sm font-admin-medium text-admin-netral-100">Fetching details...</p>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        initialFilters={filters}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
      />
      {/* Toast Notification */}
      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
      />
    </div>
  );
};

export default Dashboard;
