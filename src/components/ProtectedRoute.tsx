import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { STORAGE_KEYS } from '../utils/authStorageKeys';
import { ROUTE_PATHS } from '../utils/routeConstants';

const ProtectedRoute = () => {
  const location = useLocation();
  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const role = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
  const isAuthenticated = !!token && role === 'ADMIN';

  if (location.pathname === ROUTE_PATHS.adminLogin) {
    if (isAuthenticated) {
      // Already logged in — send to dashboard instead of showing login form again
      return <Navigate to={ROUTE_PATHS.admin} replace />;
    }
    // Not logged in — show the login form
    return <Outlet />;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to={ROUTE_PATHS.adminLogin} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
