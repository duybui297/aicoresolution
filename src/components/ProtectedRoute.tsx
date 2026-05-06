import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';
import { ROUTE_PATHS } from '../utils/routeConstants';

const ProtectedRoute = () => {
  const isAuthenticated = authService.isAuthenticated();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to={ROUTE_PATHS.adminLogin} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
