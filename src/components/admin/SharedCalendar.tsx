import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

interface SharedCalendarProps {
  selectedDate?: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  highlightToday?: boolean;
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

const SharedCalendar: React.FC<SharedCalendarProps> = ({ selectedDate, onSelectDate, minDate, highlightToday = true }) => {
  const [viewDate, setViewDate] = useState(selectedDate || new Date());
  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => setViewDate(new Date(currentYear, currentMonth - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(currentYear, currentMonth + 1, 1));

  const days = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const result = [];
    
    // Padding
    for (let i = 0; i < firstDayOfMonth; i++) {
      result.push({ day: null, isCurrent: false });
    }
    // Days
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({ day: i, isCurrent: true });
    }
    return result;
  }, [currentYear, currentMonth]);

  const isDayDisabled = (day: number) => {
    if (!minDate) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date < minDate;
  };

  const isToday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.getTime() === today.getTime();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === currentMonth && 
           selectedDate.getFullYear() === currentYear;
  };

  return (
    <div className="flex flex-col flex-1 relative bg-white select-none">
      {/* Selector Overlays */}
      {showMonthSelector && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col pt-2">
          <h4 className="text-center font-admin-semibold text-admin-primary-100 mb-4 text-admin-sm">Select Month</h4>
          <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[220px] px-2">
            {months.map((m, i) => (
              <button 
                key={m}
                onClick={() => { setViewDate(new Date(currentYear, i, 1)); setShowMonthSelector(false); }}
                className={`py-2 rounded-lg text-admin-xs font-admin-semibold transition-colors ${i === currentMonth ? 'bg-admin-secondary-100 text-admin-primary-100' : 'text-admin-netral-80 hover:bg-admin-netral-10'}`}
              >
                {m}
              </button>
            ))}
          </div>
          <button onClick={() => setShowMonthSelector(false)} className="mt-4 text-admin-xs text-admin-netral-50 font-admin-semibold">Close</button>
        </div>
      )}

      {showYearSelector && (
        <div className="absolute inset-0 bg-white z-20 flex flex-col pt-2">
          <h4 className="text-center font-admin-semibold text-admin-primary-100 mb-4 text-admin-sm">Select Year</h4>
          <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[220px] px-2">
            {years.map((y) => (
              <button 
                key={y}
                onClick={() => { setViewDate(new Date(y, currentMonth, 1)); setShowYearSelector(false); }}
                className={`py-2 rounded-lg text-admin-xs font-admin-semibold transition-colors ${y === currentYear ? 'bg-admin-secondary-100 text-admin-primary-100' : 'text-admin-netral-80 hover:bg-admin-netral-10'}`}
              >
                {y}
              </button>
            ))}
          </div>
          <button onClick={() => setShowYearSelector(false)} className="mt-4 text-admin-xs text-admin-netral-50 font-admin-semibold">Close</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center border border-admin-netral-20 rounded-lg hover:bg-admin-netral-10 transition-colors">
          <ChevronLeft className="w-4 h-4 text-admin-netral-100" />
        </button>
        <div className="flex items-center gap-4">
          <div onClick={() => setShowMonthSelector(true)} className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <span className="text-admin-base font-admin-semibold text-admin-netral-100">{months[currentMonth]}</span>
            <ChevronDown className="w-4 h-4 text-admin-netral-40" />
          </div>
          <div onClick={() => setShowYearSelector(true)} className="flex items-center gap-1 cursor-pointer hover:opacity-80">
            <span className="text-admin-base font-admin-semibold text-admin-netral-100">{currentYear}</span>
            <ChevronDown className="w-4 h-4 text-admin-netral-40" />
          </div>
        </div>
        <button onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center border border-admin-netral-20 rounded-lg hover:bg-admin-netral-10 transition-colors">
          <ChevronRight className="w-4 h-4 text-admin-netral-100" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 text-center gap-y-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-admin-xs font-admin-regular text-admin-netral-50 py-1">{day}</div>
        ))}
        {days.map((item, i) => {
          if (!item.isCurrent || item.day === null) return <div key={i} className="py-2"></div>;
          
          const day = item.day;
          const active = isSelected(day);
          const highlight = highlightToday && isToday(day);
          const disabled = isDayDisabled(day);
          
          return (
            <button 
              key={i} 
              disabled={disabled}
              onClick={() => onSelectDate(new Date(currentYear, currentMonth, day))}
              className={`text-admin-base font-admin-semibold py-1.5 transition-all flex items-center justify-center rounded-lg relative
                ${active ? 'bg-admin-secondary-100 text-admin-primary-100' : (highlight ? 'bg-admin-primary-100 text-admin-secondary-100' : '')}
                ${!active && !highlight && !disabled ? 'text-admin-netral-100 hover:bg-admin-netral-20' : ''}
                ${disabled ? 'text-admin-netral-30 cursor-not-allowed opacity-50' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SharedCalendar;
