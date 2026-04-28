import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, SlidersHorizontal } from 'lucide-react';
import { ArticleTable } from '../../components/admin/ArticleTable';
import Pagination from '../../components/admin/Pagination';
import FilterModal from '../../components/admin/FilterModal';
import { mockArticles } from '../../data/mockArticles';
import { ROUTE_PATHS } from '../../utils/routeConstants';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('All');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const itemsPerPage = 10;

  const filteredArticles = filterStatus === 'All'
    ? mockArticles
    : mockArticles.filter(article => article.status === filterStatus);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to first page when filter changes
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
      <ArticleTable articles={currentArticles} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
