import { Search, Bell, SlidersHorizontal } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <h1 className="text-admin-xl font-admin-semibold text-admin-primary-100">Articles</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-admin-netral-30 rounded-full px-4 py-2.5 bg-admin-netral-10 min-w-[320px]">
            <Search className="w-4 h-4 text-admin-netral-60 mr-3" />
            <input 
              type="text" 
              placeholder="Search somethings" 
              className="flex-1 outline-none bg-transparent text-admin-netral-60 placeholder:text-admin-netral-60 text-admin-sm font-admin-regular" 
            />
            <SlidersHorizontal className="w-4 h-4 text-admin-netral-60 ml-3 cursor-pointer hover:text-admin-netral-80 transition-colors" />
          </div>
          
          <button className="w-11 h-11 flex items-center justify-center border border-admin-netral-30 rounded-full text-admin-netral-60 hover:bg-admin-netral-20 transition-colors shrink-0">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="bg-admin-primary-100 text-admin-netral-10 px-6 py-2.5 rounded-full text-admin-sm font-admin-medium hover:bg-admin-primary-90 transition-colors shrink-0">
            Add new article
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3 bg-admin-netral-10 rounded-2xl px-6 py-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <button className="bg-admin-primary-100 text-admin-netral-10 px-8 py-2.5 rounded-full text-admin-sm font-admin-medium transition-colors">
          All
        </button>
        <button className="bg-admin-netral-10 text-admin-netral-100 border border-admin-netral-30 px-8 py-2.5 rounded-full text-admin-sm font-admin-medium hover:bg-admin-netral-20 transition-colors">
          Published
        </button>
        <button className="bg-admin-netral-10 text-admin-netral-100 border border-admin-netral-30 px-8 py-2.5 rounded-full text-admin-sm font-admin-medium hover:bg-admin-netral-20 transition-colors">
          Scheduled
        </button>
        <button className="bg-admin-netral-10 text-admin-netral-100 border border-admin-netral-30 px-8 py-2.5 rounded-full text-admin-sm font-admin-medium hover:bg-admin-netral-20 transition-colors">
          Draft
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
