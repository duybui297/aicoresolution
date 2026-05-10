import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, ArrowDown, Check, Minus, FileQuestion } from 'lucide-react';
import { Article, ArticleStatus } from '../../types/article';
import { ROUTE_PATHS } from '../../utils/routeConstants';

const CustomCheckbox = ({ 
  checked, 
  partial, 
  onClick 
}: { 
  checked: boolean; 
  partial?: boolean; 
  onClick?: () => void;
}) => {
  if (!checked && !partial) {
    return (
      <div className="w-10 h-10 flex items-center justify-center shrink-0">
        <button 
          onClick={onClick}
          className="w-4 h-4 rounded-[4px] border border-admin-netral-80 flex items-center justify-center hover:border-admin-primary-100 transition-colors"
        />
      </div>
    );
  }

  return (
    <button 
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-admin-primary-100 flex items-center justify-center shrink-0 hover:bg-admin-primary-90 transition-colors"
    >
      <div className="w-5 h-5 rounded-[4px] bg-admin-secondary-100 flex items-center justify-center">
        {partial ? (
          <Minus className="w-[14px] h-[14px] text-admin-primary-100 stroke-[3]" />
        ) : (
          <Check className="w-[14px] h-[14px] text-admin-primary-100 stroke-[3]" />
        )}
      </div>
    </button>
  );
};

const StatusBadge = ({ status }: { status: ArticleStatus }) => {
  let bg = '';
  let text = '';

  switch (status) {
    case 'Published':
      bg = 'bg-admin-success-10';
      text = 'text-admin-success-100';
      break;
    case 'Draft':
      bg = 'bg-admin-warning-10';
      text = 'text-admin-warning-100';
      break;
    case 'Scheduled':
      bg = 'bg-admin-info-10';
      text = 'text-admin-info-100';
      break;
    case 'Deleted':
      bg = 'bg-admin-error-10';
      text = 'text-admin-error-100';
      break;
    case 'Archived':
      bg = 'bg-admin-netral-20';
      text = 'text-admin-netral-60';
      break;
    default:
      bg = 'bg-admin-netral-10';
      text = 'text-admin-netral-50';
      break;
  }

  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-admin-xs font-admin-medium ${bg} ${text}`}>
      {status}
    </span>
  );
};

export const ArticleTable = ({ 
  articles = [], 
  sortConfig, 
  onSort,
  onView,
  onDelete,
  onDeleteBatch,
  selectedIds,
  onSelectionChange
}: { 
  articles?: Article[];
  sortConfig: { key: keyof Article; direction: 'asc' | 'desc' } | null;
  onSort: (config: { key: keyof Article; direction: 'asc' | 'desc' } | null) => void;
  onView?: (id: number) => void; 
  onDelete?: (id: number) => void;
  onDeleteBatch?: (ids: number[]) => void;
  selectedIds: Set<number>;
  onSelectionChange: (ids: Set<number>) => void;
}) => {
  const navigate = useNavigate();
  const requestSort = (key: keyof Article) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    onSort({ key, direction });
  };

  const sortedArticles = articles; // Now sorted on server-side

  if (articles.length === 0) {
    return (
      <div className="bg-admin-netral-10 rounded-2xl px-6 py-20 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-admin-netral-20 rounded-full flex items-center justify-center mb-6">
          <FileQuestion className="w-10 h-10 text-admin-netral-40" />
        </div>
        <h3 className="text-admin-xl font-admin-semibold text-admin-netral-100 mb-2">No articles found</h3>
        <p className="text-admin-sm text-admin-netral-50 max-w-[300px]">
          We couldn't find any articles matching your search or filters. Try adjusting your criteria.
        </p>
      </div>
    );
  }

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRefs = useRef<Map<number, HTMLTableCellElement>>(new Map());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideAnyDropdown = Array.from(dropdownRefs.current.values()).some(
        (ref) => ref && ref.contains(event.target as Node)
      );
      if (!isInsideAnyDropdown) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const isAllSelected = articles.length > 0 && selectedIds.size === articles.length;
  const isPartialSelected = selectedIds.size > 0 && selectedIds.size < articles.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(articles.map(a => a.id)));
    }
  };

  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    onSelectionChange(newSet);
  };

  return (
    <div className="bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-x-auto flex-1 h-full">
        <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="border-b border-admin-netral-20">
            <th className="h-[2.5rem] pr-4 w-12 align-middle">
              <CustomCheckbox 
                checked={isAllSelected || isPartialSelected} 
                partial={isPartialSelected}
                onClick={handleSelectAll}
              />
            </th>
            <th 
              className="h-[2.5rem] px-4 text-admin-base font-admin-semibold text-admin-primary-100 whitespace-nowrap align-middle cursor-pointer select-none group"
              onClick={() => requestSort('publisher')}
            >
              <div className="flex items-center gap-2">
                Publisher 
                <ArrowDown className={`w-4 h-4 text-admin-netral-60 transition-transform ${sortConfig?.key === 'publisher' ? (sortConfig.direction === 'desc' ? 'rotate-180 text-admin-primary-100' : 'text-admin-primary-100') : 'group-hover:text-admin-netral-80'}`} />
              </div>
            </th>
            <th className="h-[2.5rem] px-4 text-admin-base font-admin-semibold text-admin-primary-100 align-middle">
              Article headline
            </th>
            <th 
              className="h-[2.5rem] px-4 text-admin-base font-admin-semibold text-admin-primary-100 whitespace-nowrap align-middle cursor-pointer select-none group"
              onClick={() => requestSort('status')}
            >
              <div className="flex items-center gap-2">
                Status 
                <ArrowDown className={`w-4 h-4 text-admin-netral-60 transition-transform ${sortConfig?.key === 'status' ? (sortConfig.direction === 'desc' ? 'rotate-180 text-admin-primary-100' : 'text-admin-primary-100') : 'group-hover:text-admin-netral-80'}`} />
              </div>
            </th>
            <th className="h-[2.5rem] px-4 text-admin-base font-admin-semibold text-admin-primary-100 whitespace-nowrap align-middle">
              Role
            </th>
            <th 
              className="h-[2.5rem] px-4 text-admin-base font-admin-semibold text-admin-primary-100 whitespace-nowrap align-middle cursor-pointer select-none group"
              onClick={() => requestSort('dateCreated')}
            >
              <div className="flex items-center gap-2">
                Published At 
                <ArrowDown className={`w-4 h-4 text-admin-netral-60 transition-transform ${sortConfig?.key === 'dateCreated' ? (sortConfig.direction === 'desc' ? 'rotate-180 text-admin-primary-100' : 'text-admin-primary-100') : 'group-hover:text-admin-netral-80'}`} />
              </div>
            </th>
            <th className="h-[2.5rem] pl-4 text-admin-base font-admin-semibold text-admin-primary-100 whitespace-nowrap text-right align-middle">
              Options
            </th>
          </tr>
        </thead>
        <tbody className="text-admin-xs font-admin-regular text-admin-netral-100">
          {sortedArticles.map((article) => (
            <tr key={article.id} className="border-b border-admin-netral-20 last:border-none hover:bg-admin-netral-20/50 transition-colors h-[3.625rem]">
              <td className="h-[3.625rem] pr-4 align-middle">
                <CustomCheckbox 
                  checked={selectedIds.has(article.id)} 
                  onClick={() => toggleSelect(article.id)}
                />
              </td>
              <td className="h-[3.625rem] px-4 whitespace-nowrap align-middle">{article.publisher}</td>
              <td className="h-[3.625rem] px-4 max-w-md align-middle">
                <button
                  onClick={() => navigate(ROUTE_PATHS.adminEditArticle.replace(':id', article.id.toString()))}
                  className="hover:text-admin-primary-100 transition-colors text-left font-admin-regular line-clamp-2"
                >
                  {article.headline}
                </button>
              </td>
              <td className="h-[3.625rem] px-4 whitespace-nowrap align-middle">
                <StatusBadge status={article.status} />
              </td>
              <td className="h-[3.625rem] px-4 whitespace-nowrap align-middle">{article.role}</td>
              <td className="h-[3.625rem] px-4 whitespace-nowrap align-middle">{article.dateCreated}</td>
              <td className="h-[3.625rem] pl-4 text-right relative align-middle" ref={(el) => {
                  if (el) dropdownRefs.current.set(article.id, el);
                  else dropdownRefs.current.delete(article.id);
                }}>
                <button
                  onClick={() => toggleDropdown(article.id)}
                  className="p-2 hover:bg-admin-netral-20 rounded-full transition-colors text-admin-netral-60"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>

                {openDropdownId === article.id && (
                  <div className="absolute right-0 top-12 w-[11.25rem] p-2 bg-admin-netral-10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] z-10 border border-admin-netral-20 flex flex-col">
                    <button 
                      onClick={() => {
                        navigate(ROUTE_PATHS.adminEditArticle.replace(':id', article.id.toString()));
                        setOpenDropdownId(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-admin-netral-20 transition-colors text-admin-sm font-admin-regular text-admin-netral-100"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => {
                        onDelete?.(article.id);
                        setOpenDropdownId(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-admin-error-10 transition-colors text-admin-sm font-admin-regular text-admin-error-100"
                    >
                      Delete
                    </button>
                    <button 
                      onClick={() => {
                        onView?.(article.id);
                        setOpenDropdownId(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-admin-netral-20 transition-colors text-admin-sm font-admin-regular text-admin-netral-100"
                    >
                      View article
                    </button>
                    {/* <button 
                      onClick={() => setOpenDropdownId(null)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-admin-netral-20 transition-colors text-admin-sm font-admin-regular text-admin-netral-100"
                    >
                      Takedown
                    </button> */}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
