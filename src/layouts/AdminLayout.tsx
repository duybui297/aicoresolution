import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#FAFAFA] flex font-admin">
      <AdminSidebar />
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <main className="flex-1 overflow-y-auto overflow-x-hidden rounded-2xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
