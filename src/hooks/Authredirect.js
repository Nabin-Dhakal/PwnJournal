 import { Navigate } from 'react-router-dom';
import { useAuth } from '..//AuthContext'; // adjust based on your app

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Or however you track auth

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
