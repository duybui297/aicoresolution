import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const getPages = () => {
    if (!totalPages || totalPages <= 0) return [1];
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPages();

  return (
    <div className="w-full h-[3.875rem] flex items-center justify-between bg-admin-netral-10 rounded-2xl px-2 py-3 border border-admin-netral-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-3 text-admin-base font-admin-regular transition-colors ${currentPage === 1 ? 'text-admin-netral-80 cursor-not-allowed' : 'text-admin-netral-100 hover:bg-admin-netral-20 rounded-lg py-2'
          }`}
      >
        <ArrowLeft className="w-5 h-5" />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={index} className="w-10 h-10 flex items-center justify-center text-admin-primary-100 text-admin-base font-admin-semibold">
                ...
              </span>
            );
          }

          const isSelected = currentPage === page;
          return (
            <button
              key={index}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-admin-base font-admin-semibold transition-colors ${isSelected
                  ? 'bg-admin-primary-100 text-admin-netral-10'
                  : 'bg-transparent text-admin-primary-100 hover:bg-admin-netral-20'
                }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages || !totalPages}
        className={`flex items-center gap-2 px-3 text-admin-base font-admin-regular transition-colors ${currentPage >= totalPages || !totalPages ? 'text-admin-netral-80 cursor-not-allowed' : 'text-admin-netral-100 hover:bg-admin-netral-20 rounded-lg py-2'
          }`}
      >
        Next
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
