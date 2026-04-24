import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, ChevronDown, Users, FileText } from 'lucide-react';
import { mockArticles } from '../../data/mockArticles';

import SharedCalendar from './SharedCalendar';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [searchQuery, setSearchQuery] = useState('');


  const roles = useMemo(() => ['Sasha Sasmitha', 'John Doe', 'Jane Smith', 'Contributor'], []);

  const suggestedRole = useMemo(() => {
    if (!searchQuery.trim()) return '';
    return roles.find(r => r.toLowerCase().startsWith(searchQuery.toLowerCase())) || '';
  }, [searchQuery, roles]);

  const filteredRoles = useMemo(() => 
    roles.filter(r => r.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, roles]
  );

  const filteredArticles = useMemo(() => 
    mockArticles.filter(a => a.headline.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 2),
    [searchQuery]
  );

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
      <div className="bg-admin-netral-10 w-[500px] h-auto max-h-[90vh] rounded-[24px] p-6 shadow-2xl overflow-y-auto relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute -top-12 -right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center text-admin-netral-100 hover:bg-admin-netral-20 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col gap-8">
          {/* Search Bar with Suggestions */}
          <div className="relative">
            <div className="flex items-center border border-admin-netral-30 rounded-full px-4 py-2 bg-white relative z-[1010]">
              <Search className="w-4 h-4 text-admin-netral-40 mr-2" />
              <div className="flex-1 relative h-5 flex items-center">
                {searchQuery && suggestedRole && suggestedRole.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
                  <div className="absolute left-0 text-admin-xs font-admin-regular text-admin-netral-40 pointer-events-none whitespace-pre">
                    <span className="invisible">{searchQuery}</span>
                    <span>{suggestedRole.substring(searchQuery.length)}</span>
                  </div>
                )}
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

            {/* Suggestions Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border border-admin-netral-30 rounded-[24px] p-6 shadow-xl z-[1030] flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                {filteredRoles.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-admin-xs font-admin-regular text-admin-netral-50">Roles</p>
                    {filteredRoles.map(role => (
                      <div key={role} className="flex items-center gap-3 cursor-pointer hover:bg-admin-netral-10 p-2 -m-2 rounded-lg transition-colors">
                        <Users className="w-5 h-5 text-admin-primary-100" />
                        <span className="text-admin-base font-admin-regular text-admin-netral-100">{role}</span>
                      </div>
                    ))}
                  </div>
                )}

                {filteredArticles.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <p className="text-admin-xs font-admin-regular text-admin-netral-50">Articles</p>
                    {filteredArticles.map(article => (
                      <div key={article.id} className="flex items-start gap-3 cursor-pointer hover:bg-admin-netral-10 p-2 -m-2 rounded-lg transition-colors">
                        <FileText className="w-5 h-5 text-admin-primary-100 mt-0.5" />
                        <span className="text-admin-base font-admin-regular text-admin-netral-100 line-clamp-2 leading-tight">
                          {article.headline}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Status Articles */}
          <section className="flex flex-col gap-3">
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
          <section className="flex flex-col gap-3">
            <h3 className="text-admin-xs font-admin-semibold text-admin-netral-60">Date Range</h3>
            <div className="flex flex-wrap gap-2">
              {['1 day ago', '3 days ago', '7 days ago', '30 days ago', '90 days ago'].map(item => (
                <button 
                  key={item} 
                  onClick={() => setSelectedDateRange(item)}
                  className={`px-4 py-1.5 rounded-full text-admin-xs font-admin-regular transition-all
                    ${selectedDateRange === item 
                      ? 'bg-admin-primary-100 text-white' 
                      : 'bg-admin-netral-20 text-admin-netral-80 hover:bg-admin-netral-30'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Calendar Picker */}
          <div className="bg-white rounded-2xl p-4 border border-admin-netral-20">
            <SharedCalendar 
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>

          {/* Roles */}
          <section className="flex flex-col gap-3">
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

          {/* Footer Buttons */}
          <div className="flex gap-4 pt-4 mt-auto">
            <button 
              onClick={onClose}
              className="flex-1 py-3 border border-admin-netral-30 rounded-xl text-admin-xs font-admin-medium text-admin-netral-100 hover:bg-admin-netral-20 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-admin-primary-100 text-white rounded-xl text-admin-xs font-admin-medium hover:bg-admin-primary-90 transition-colors"
            >
              Apply filter
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FilterModal;
