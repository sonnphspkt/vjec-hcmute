import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

/** Alias URL: many setups/bookmarks expect /dashboard */
const DashboardRedirect = () => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: '/dashboard' }} />;
  }
  if (user?.role === 'student') {
    return <Navigate to="/student" replace />;
  }
  if (user?.role === 'company') {
    return <Navigate to="/company" replace />;
  }
  return <Navigate to="/" replace />;
};

export default DashboardRedirect;
