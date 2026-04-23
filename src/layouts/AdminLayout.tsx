import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-admin">
      <AdminSidebar />
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <main className="flex-1 overflow-auto rounded-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
