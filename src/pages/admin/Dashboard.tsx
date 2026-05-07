import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, SlidersHorizontal, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { ArticleTable } from '../../components/admin/ArticleTable';
import Pagination from '../../components/admin/Pagination';
import FilterModal from '../../components/admin/FilterModal';
import ArticlePreview from '../../components/admin/ArticlePreview';
import Toast from '../../components/admin/Toast';
import postService from '../../services/postService';
import { Article } from '../../types/article';
import { PostResponse } from '../../types/api';
import { ROUTE_PATHS } from '../../utils/routeConstants';
import { formatISODateForDisplay } from '../../utils/dateUtils';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
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

  // New Selection state
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const itemsPerPage = 10;

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

      const response = await postService.getPosts(
        currentPage - 1, 
        itemsPerPage, 
        filterStatus === 'All' ? undefined : filterStatus.toUpperCase(),
        sortParam
      );
      
      const mappedArticles: Article[] = response.content.map(p => ({
        id: p.id,
        publisher: p.authorName || 'Super Admin',
        headline: p.title,
        status: p.status === 'PUBLISHED' ? 'Published' : 
                p.status === 'DRAFT' ? 'Draft' : 
                p.status === 'DELETED' ? 'Deleted' : 
                p.status === 'SCHEDULED' ? 'Scheduled' : 'Unknown',
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
  }, [currentPage, filterStatus, sortConfig]);

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

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0 overflow-x-auto">
        {['All', 'Published', 'Scheduled', 'Draft'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleFilterChange(tab)}
            className={`px-8 py-2.5 rounded-full text-admin-xs font-admin-medium transition-colors shrink-0 ${filterStatus === tab
                ? 'bg-admin-primary-100 text-admin-netral-10'
                : 'bg-admin-netral-10 text-admin-netral-100 border border-admin-netral-30 hover:bg-admin-netral-20'
              }`}
          >
            {tab}
          </button>
        ))}
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
          onDeleteBatch={handleDeleteBatch}
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
