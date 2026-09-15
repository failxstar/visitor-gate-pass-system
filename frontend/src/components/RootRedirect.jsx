import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const RootRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
  if (user.role === 'HOST') return <Navigate to="/host" replace />;
  if (user.role === 'GUARD') return <Navigate to="/guard" replace />;
  
  return <Navigate to="/unauthorized" replace />;
};

export default RootRedirect;
