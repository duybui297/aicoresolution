import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
