import React, { useState } from 'react';
import SharedCalendar from './SharedCalendar';

interface DateTimePickerProps {
  onClose?: () => void;
  onApply?: (dateStr: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onClose, onApply }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const today = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const handleApply = () => {
    if (selectedDate && selectedHour && selectedMinute && selectedPeriod && onApply) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const dateStr = `${day}/${month}/${year} - ${selectedHour}:${selectedMinute} ${selectedPeriod}`;
      onApply(dateStr);
    }
    if (onClose) onClose();
  };

  return (
    <div className="bg-white rounded-2xl border border-admin-netral-20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex py-4 px-6 gap-6 w-[587px] h-[378px] z-50">
       {/* Left side: Calendar */}
       <div className="flex flex-col flex-1 relative">
          <SharedCalendar 
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            minDate={today}
          />
          
          {/* Footer Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-2.5 border border-admin-netral-20 rounded-lg text-admin-xs font-admin-regular text-admin-netral-100 hover:bg-admin-netral-10 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleApply}
              className="flex-1 py-2.5 bg-admin-primary-100 rounded-lg text-admin-xs font-admin-regular text-white hover:bg-admin-primary-90 transition-colors"
            >
              Apply
            </button>
          </div>
       </div>
       
       {/* Right side: Time Picker */}
       <div className="flex flex-col w-[200px]">
         <div className="text-center text-admin-base font-admin-semibold text-admin-primary-100 mb-2 mt-1">
           {selectedHour || '--'} : {selectedMinute || '--'} {selectedPeriod || '--'}
         </div>
         
         <div className="flex gap-2 h-[290px] relative overflow-hidden">
            {/* Fade overlays for scrolling illusion */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

            {/* Hours */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 items-center [&::-webkit-scrollbar]:hidden pt-2 pb-20">
               {['00','01','02','03','04','05','06','07', '08', '09', '10', '11', '12'].map((h) => (
                 <div 
                   key={h} 
                   onClick={() => setSelectedHour(h)}
                   className={`w-12 h-10 flex shrink-0 items-center justify-center rounded-lg text-admin-base font-admin-semibold cursor-pointer transition-colors ${h === selectedHour ? 'bg-admin-secondary-100 text-admin-primary-100' : 'text-admin-primary-100 hover:bg-admin-netral-10'}`}
                 >
                   {h}
                 </div>
               ))}
            </div>
            
            {/* Divider line */}
            <div className="w-px bg-admin-netral-20 h-full"></div>
            
            {/* Minutes */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-1 items-center [&::-webkit-scrollbar]:hidden pt-2 pb-20">
               {['00','05','10','15','20','25','30','35','40','45','50','55'].map((m) => (
                 <div 
                   key={m} 
                   onClick={() => setSelectedMinute(m)}
                   className={`w-12 h-10 flex shrink-0 items-center justify-center rounded-lg text-admin-base font-admin-semibold cursor-pointer transition-colors ${m === selectedMinute ? 'bg-admin-secondary-100 text-admin-primary-100' : 'text-admin-primary-100 hover:bg-admin-netral-10'}`}
                 >
                   {m}
                 </div>
               ))}
            </div>
            
            {/* Divider line */}
            <div className="w-px bg-admin-netral-20 h-full opacity-0"></div> {/* Just for spacing */}
            
            {/* AM/PM */}
            <div className="flex-1 flex flex-col gap-1 items-center pt-2">
               <div 
                 onClick={() => setSelectedPeriod('AM')}
                 className={`w-12 h-10 flex shrink-0 items-center justify-center rounded-lg text-admin-base font-admin-semibold cursor-pointer transition-colors ${selectedPeriod === 'AM' ? 'bg-admin-secondary-100 text-admin-primary-100' : 'text-admin-primary-100 hover:bg-admin-netral-10'}`}
               >
                 AM
               </div>
               <div 
                 onClick={() => setSelectedPeriod('PM')}
                 className={`w-12 h-10 flex shrink-0 items-center justify-center rounded-lg text-admin-base font-admin-semibold cursor-pointer transition-colors ${selectedPeriod === 'PM' ? 'bg-admin-secondary-100 text-admin-primary-100' : 'text-admin-primary-100 hover:bg-admin-netral-10'}`}
               >
                 PM
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default DateTimePicker;
