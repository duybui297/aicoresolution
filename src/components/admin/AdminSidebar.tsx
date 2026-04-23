import { Link, useLocation } from 'react-router-dom';
import {
  FileText,
  Clock,
  Users,
  Trash2,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';
import logo from '../../assets/logo.png';

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-[301px] h-[calc(100vh-32px)] my-4 ml-4 bg-admin-primary-100 rounded-2xl p-8 flex flex-col gap-10 relative shadow-xl overflow-hidden shrink-0">
      {/* Logo Section */}
      <div className="flex items-center gap-3 relative z-10">
        <img src={logo} alt="AICoreSolutions Logo" className="h-8 w-auto shrink-0" />
        <span className="text-admin-xl font-admin-semibold text-admin-secondary-100">AICoreSolutions</span>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col relative z-10">
        <span className="text-admin-sm font-admin-regular text-admin-netral-60 mb-4">Menu</span>

        <div className="flex flex-col gap-2">
          {/* Active Item Example */}
          <Link to="/admin" className="relative flex items-center px-4 py-3 text-admin-base font-admin-regular text-admin-netral-10 cursor-pointer rounded-lg hover:bg-white/5 transition-colors">
            <div className="absolute -left-8 w-[6px] h-8 bg-admin-secondary-100 rounded-r-lg" />
            <FileText className="w-5 h-5 mr-3 shrink-0" />
            Articles
          </Link>

          {/* Inactive Items */}
          <Link to="/admin/scheduled" className="flex items-center px-4 py-3 text-admin-base font-admin-regular text-admin-netral-60 hover:text-admin-secondary-100 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
            <Clock className="w-5 h-5 mr-3 shrink-0" />
            Scheduled
          </Link>

          <Link to="/admin/contributors" className="flex items-center px-4 py-3 text-admin-base font-admin-regular text-admin-netral-60 hover:text-admin-secondary-100 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
            <Users className="w-5 h-5 mr-3 shrink-0" />
            Contributors
          </Link>

          <Link to="/admin/trash" className="flex items-center px-4 py-3 text-admin-base font-admin-regular text-admin-netral-60 hover:text-admin-secondary-100 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
            <Trash2 className="w-5 h-5 mr-3 shrink-0" />
            Trash
          </Link>

          <Link to="/admin/settings" className="flex items-center px-4 py-3 text-admin-base font-admin-regular text-admin-netral-60 hover:text-admin-secondary-100 hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
            <Settings className="w-5 h-5 mr-3 shrink-0" />
            Settings
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto flex flex-col gap-6 relative z-10">
        <div className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
          <span className="text-admin-sm font-admin-semibold text-admin-netral-10">Super Admin</span>
          <ChevronRight className="w-5 h-5 text-admin-netral-60" />
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://ui-avatars.com/api/?name=Jack+O+Conner&background=f3f4f6&color=374151"
            alt="Jack O'Conner"
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/10"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-admin-xs font-admin-semibold text-admin-netral-10 truncate">Jack O'Conner</span>
            <span className="text-admin-xs font-admin-regular text-admin-netral-70 truncate">jackoconer123@gmail.com</span>
          </div>
        </div>

        <Link to="/" className="flex items-center px-2 py-2 text-admin-netral-60 hover:text-admin-netral-10 hover:bg-white/5 rounded-lg cursor-pointer transition-colors -mx-2">
          <LogOut className="w-5 h-5 mr-3 shrink-0" />
          <span className="text-admin-base font-admin-regular">Log out</span>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
