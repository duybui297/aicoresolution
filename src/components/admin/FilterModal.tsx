import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, SlidersHorizontal, X, Users, FileText } from 'lucide-react';

import SharedCalendar from './SharedCalendar';
import postService from '../../services/postService';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialFilters?: {
    statuses: string[];
    dateRange: string;
    specificDate: Date | null;
    role: string;
    searchQuery: string;
  };
  onApply: (filters: {
    statuses: string[];
    dateRange: string;
    specificDate: Date | null;
    role: string;
    searchQuery: string;
  }) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, initialFilters, onApply }) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(initialFilters?.statuses || []);
  const [selectedDateRange, setSelectedDateRange] = useState<string>(initialFilters?.dateRange || '');
  const [selectedRole, setSelectedRole] = useState<string>(initialFilters?.role || 'All');
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialFilters?.specificDate || null);
  const [searchQuery, setSearchQuery] = useState(initialFilters?.searchQuery || '');
  const [suggestions, setSuggestions] = useState<{ articles: any[], authors: string[] }>({ articles: [], authors: [] });
  const [isSearching, setIsSearching] = useState(false);

  // Fetch real suggestions from backend
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions({ articles: [], authors: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await postService.getPosts(0, 5, undefined, undefined, searchQuery);
        
        // Extract unique author names for suggestions
        const authors = Array.from(new Set(response.content.map(p => p.authorName || 'Super Admin')));
        
        setSuggestions({
          articles: response.content.map(p => ({ id: p.id, title: p.title })),
          authors: authors
        });
      } catch (error) {
        console.error('Failed to fetch search suggestions:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleApply = () => {
    onApply({
      statuses: selectedStatuses,
      dateRange: selectedDateRange,
      specificDate: selectedDate,
      role: selectedRole,
      searchQuery: searchQuery
    });
    onClose();
  };

  if (!isOpen) return null;

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const statuses = [
    { label: 'Published', color: 'bg-admin-success-10 text-admin-success-100' },
    { label: 'Scheduled', color: 'bg-admin-info-10 text-admin-info-100' },
    { label: 'Draft', color: 'bg-admin-warning-10 text-admin-warning-100' },
    { label: 'Waiting for approval', color: 'bg-admin-netral-20 text-admin-netral-100' },
    { label: 'Approved', color: 'bg-admin-success-10 text-admin-success-100' },
    { label: 'Rejected', color: 'bg-admin-error-10 text-admin-error-100' }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-admin-netral-10 w-[500px] h-[778px] rounded-[24px] shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-300 overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 -right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-admin-netral-100 hover:bg-admin-netral-20 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 custom-scrollbar">
          <div className="flex flex-col gap-8">
            {/* Search Bar with Suggestions */}
            <div className="relative">
              <div className="flex items-center border border-admin-netral-30 rounded-full px-4 py-2 bg-white relative z-[1010]">
                <Search className="w-4 h-4 text-admin-netral-40 mr-2" />
                <div className="flex-1 relative h-5 flex items-center">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={!searchQuery ? "Search somethings" : ""} 
                    className="w-full outline-none text-admin-xs font-admin-regular bg-transparent relative z-[1020]"
                  />
                </div>
                <SlidersHorizontal className="w-4 h-4 text-admin-netral-60 ml-2" />
              </div>
              {/* ... suggestions dropdown logic stays the same ... */}

              {/* Suggestions Dropdown */}
              {searchQuery.length >= 2 && (suggestions.authors.length > 0 || suggestions.articles.length > 0 || isSearching) && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-2xl shadow-admin-lg border border-admin-netral-20 p-4 z-[1050]">
                  {isSearching ? (
                    <div className="text-admin-xs text-admin-netral-60 p-2 italic">Searching...</div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {suggestions.authors.length > 0 && (
                        <div>
                          <h4 className="text-admin-xs font-admin-semibold text-admin-netral-40 mb-2">Authors</h4>
                          <div className="flex flex-col gap-1">
                            {suggestions.authors.map(author => (
                              <button 
                                key={author}
                                onClick={() => {
                                  setSearchQuery(author);
                                  setSuggestions({ articles: [], authors: [] });
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-admin-netral-10 rounded-xl transition-colors text-left"
                              >
                                <Users className="w-4 h-4 text-admin-netral-60" />
                                <span className="text-admin-xs font-admin-medium text-admin-netral-100">{author}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {suggestions.articles.length > 0 && (
                        <div>
                          <h4 className="text-admin-xs font-admin-semibold text-admin-netral-40 mb-2">Articles</h4>
                          <div className="flex flex-col gap-1">
                            {suggestions.articles.map(article => (
                              <button 
                                key={article.id}
                                onClick={() => {
                                  setSearchQuery(article.title);
                                  setSuggestions({ articles: [], authors: [] });
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-admin-netral-10 rounded-xl transition-colors text-left"
                              >
                                <FileText className="w-4 h-4 text-admin-netral-60" />
                                <span className="text-admin-xs font-admin-medium text-admin-netral-100 line-clamp-1">{article.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Status Articles */}
            <section className="flex flex-col gap-4">
              <h3 className="text-admin-xs font-admin-semibold text-admin-netral-60">Status Articles</h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map(s => (
                  <button
                    key={s.label}
                    onClick={() => toggleStatus(s.label)}
                    className={`px-4 py-1.5 rounded-full text-admin-xs font-admin-regular transition-all border
                      ${selectedStatuses.includes(s.label) 
                        ? 'border-admin-primary-100 ring-1 ring-admin-primary-100' 
                        : 'border-transparent'} 
                      ${s.color} hover:brightness-95`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Date Range */}
            <section className="flex flex-col gap-4">
              <h3 className="text-admin-xs font-admin-semibold text-admin-netral-60">Date Range</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {['1 day ago', '3 days ago', '7 days ago', '30 days ago', '90 days ago'].map(item => (
                    <button 
                      key={item} 
                      onClick={() => {
                        setSelectedDateRange(item);
                        setSelectedDate(null);
                      }}
                      className={`px-4 py-1.5 rounded-full text-admin-xs font-admin-regular transition-all
                        ${selectedDateRange === item 
                          ? 'bg-admin-primary-100 text-white' 
                          : 'bg-admin-netral-20 text-admin-netral-80 hover:bg-admin-netral-30'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                
                {/* Calendar Picker */}
                <div className="bg-white rounded-2xl p-4 border border-admin-netral-20">
                  <SharedCalendar 
                    selectedDate={selectedDate}
                    onSelectDate={(date) => {
                      setSelectedDate(date);
                      setSelectedDateRange('');
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Roles */}
            <section className="flex flex-col gap-4">
              <h3 className="text-admin-xs font-admin-semibold text-admin-netral-60">Roles</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Super Admin', 'Contributor'].map(role => (
                  <button 
                    key={role} 
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-1.5 rounded-full text-admin-xs font-admin-regular transition-all
                      ${selectedRole === role 
                        ? 'bg-admin-primary-100 text-white' 
                        : 'bg-admin-netral-20 text-admin-netral-80 hover:bg-admin-netral-30'}`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Fixed Footer Buttons */}
        <div className="p-6 pt-2 bg-admin-netral-10 flex gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 h-10 border border-admin-netral-30 rounded-xl text-admin-xs font-admin-medium text-admin-netral-100 hover:bg-admin-netral-20 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleApply}
            className="flex-1 h-10 bg-admin-primary-100 text-white rounded-xl text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors"
          >
            Apply filter
          </button>
        </div>
      </div>
    </div>
,
    document.body
  );
};

export default FilterModal;
