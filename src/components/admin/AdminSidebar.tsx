import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import authService from '../../services/authService';
import { ROUTE_PATHS } from '../../utils/routeConstants';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate(ROUTE_PATHS.adminLogin);
  };

  return (
    <div className="w-[240px] 2xl:w-[301px] h-[calc(100vh-2rem)] my-4 ml-4 bg-admin-primary-100 rounded-2xl p-6 2xl:p-8 flex flex-col gap-8 2xl:gap-10 relative shadow-xl overflow-hidden shrink-0 transition-all duration-300">
      {/* Logo Section */}
      <div className="flex items-center gap-2 2xl:gap-3 relative z-10">
        <img src={logo} alt="AICoreSolutions Logo" className="h-6 2xl:h-8 w-auto shrink-0 transition-all" />
        <span className="text-admin-base 2xl:text-admin-xl font-admin-semibold text-admin-secondary-100 truncate transition-all">AICoreSolutions</span>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col relative z-10">
        <span className="text-admin-sm font-admin-regular text-admin-netral-60 mb-4">Menu</span>

        <div className="flex flex-col gap-2">
          {[
            { to: ROUTE_PATHS.admin, icon: FileText, label: 'Articles' },
            { to: ROUTE_PATHS.adminScheduled, icon: Clock, label: 'Scheduled' },
            { to: ROUTE_PATHS.adminContributors, icon: Users, label: 'Contributors' },
            { to: ROUTE_PATHS.adminTrash, icon: Trash2, label: 'Trash' },
            { to: ROUTE_PATHS.adminSettings, icon: Settings, label: 'Settings' },
          ].map((item) => {
            const active = location.pathname === item.to;
            const Icon = item.icon;
            return (
              <Link 
                key={item.to}
                to={item.to} 
                className={`relative flex items-center px-4 py-3 text-admin-sm 2xl:text-admin-base font-admin-regular transition-colors rounded-lg hover:bg-white/5 ${
                  active ? 'text-admin-netral-10' : 'text-admin-netral-60 hover:text-admin-secondary-100'
                }`}
              >
                {active && (
                  <div className="absolute -left-8 w-[6px] h-8 bg-admin-secondary-100 rounded-r-lg" />
                )}
                <Icon className="w-5 h-5 mr-3 shrink-0" />
                {item.label}
              </Link>
            );
          })}
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

        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-2 py-2 text-admin-netral-60 hover:text-admin-netral-10 hover:bg-white/5 rounded-lg cursor-pointer transition-colors -mx-2"
        >
          <LogOut className="w-5 h-5 mr-3 shrink-0" />
          <span className="text-admin-sm 2xl:text-admin-base font-admin-regular">Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
